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
import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { CreatePlaceDto, ExtendedContext } from '../types';

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

  async create(createPlaceDto: CreatePlaceDto): Promise<void> {
    const { photo, mediaGroup } = createPlaceDto;

    const place = await lastValueFrom(
      this.placesService.create(createPlaceDto)
    );

    if (mediaGroup) {
      await Promise.all(
        mediaGroup.map((message) =>
          this.downloadPlacePhoto(message.photo, place.id)
        )
      );
    } else if (photo) {
      await this.downloadPlacePhoto(photo, place.id);
    }
  }

  async downloadPlacePhoto(
    photoSet: PhotoSize[],
    placeId: string
  ): Promise<void> {
    const largestPhotoSize = Math.max(
      ...photoSet.map(({ file_size }) => file_size)
    );
    const photo = photoSet.find(
      ({ file_size }) => file_size === largestPhotoSize
    )?.file_id;

    const file = photo ? await this.bot.telegram.getFile(photo) : null;

    if (file) {
      this.backendClientKafka.emit<void, DownloadPlacePhotoInterface>(
        BackendPatternsEnum.DOWNLOAD_PLACE_PHOTO,
        {
          placeId,
          photoPath: file.file_path,
        }
      );
    }
  }
}
