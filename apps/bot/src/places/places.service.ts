import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProtobufPackageEnum, places } from '@types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PlacesService implements OnModuleInit {
  private placesService: places.PlacesServiceClient;

  constructor(
    @Inject(ProtobufPackageEnum.PLACES) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.placesService = this.client.getService<places.PlacesServiceClient>(
      places.PLACES_SERVICE_NAME
    );
  }

  create(createPlaceDto: places.CreatePlaceDto): Promise<places.Place> {
    return lastValueFrom(this.placesService.create(createPlaceDto));
  }
}
