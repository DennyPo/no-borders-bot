import { Controller, UseGuards } from '@nestjs/common';
import { places } from '@types';
import { GrpcAuthGuard } from '../guards/grpc-auth.guard';
import { PlacesService } from './places.service';

@Controller()
@places.PlacesServiceControllerMethods()
@UseGuards(GrpcAuthGuard)
export class PlacesController implements places.PlacesServiceController {
  constructor(private readonly placesService: PlacesService) {}

  create(createPlaceDto: places.CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }
}
