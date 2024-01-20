import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  BACKEND_KAFKA_TOKEN,
  BackendPatternsEnum,
  DownloadPlacePhotoInterface,
  ProtobufPackageEnum,
  places,
} from '@types';
import { InjectBot } from 'nestjs-telegraf';
import { lastValueFrom } from 'rxjs';
import { Telegraf } from 'telegraf';
import { ExtendedContext } from '../types';

@Injectable()
export class PlacesService implements OnModuleInit {
  private placesService: places.PlacesServiceClient;

  constructor(
    @Inject(ProtobufPackageEnum.PLACES)
    private readonly backendClientGrpc: ClientGrpc,
    @Inject(BACKEND_KAFKA_TOKEN)
    private readonly backendClientKafka: ClientKafka,
    @InjectBot() private bot: Telegraf<ExtendedContext>
  ) {}

  async onModuleInit() {
    this.placesService =
      this.backendClientGrpc.getService<places.PlacesServiceClient>(
        places.PLACES_SERVICE_NAME
      );

    await this.backendClientKafka.connect();
  }

  async create(
    createPlaceDto: places.CreatePlaceDto & { photo?: string }
  ): Promise<void> {
    const { photo } = createPlaceDto;

    const file = photo ? await this.bot.telegram.getFile(photo) : null;

    const place = await lastValueFrom(
      this.placesService.create(createPlaceDto)
    );

    if (file) {
      this.backendClientKafka.emit<void, DownloadPlacePhotoInterface>(
        BackendPatternsEnum.DOWNLOAD_PLACE_PHOTO,
        {
          placeId: place.id,
          photoPath: file.file_path,
        }
      );
    }
  }
}
