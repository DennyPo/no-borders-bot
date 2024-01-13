import { Injectable } from '@nestjs/common';
import { places } from '@types';
import { PlaceTypeEnum, PrismaService } from '../prisma';

@Injectable()
export class PlacesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlaceDto: places.CreatePlaceDto) {
    const { userId, description, latitude, longitude, type } =
      createPlaceDto;

    const place = await this.prismaService.place.create({
      data: {
        userId,
        description,
        latitude,
        longitude,
        type: places.PlaceTypeEnum[type] as PlaceTypeEnum,
      },
    });

    return {
      ...place,
      type: places.PlaceTypeEnum[place.type],
    };
  }
}
