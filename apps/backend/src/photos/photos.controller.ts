import { Controller } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BackendPatternsEnum, DownloadPlacePhotoInterface } from '@types';

@Controller()
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}



  @EventPattern(BackendPatternsEnum.DOWNLOAD_PLACE_PHOTO)
  download(@Payload() downloadPlacePhotoDto: DownloadPlacePhotoInterface) {
    console.log('====== downloadPlacePhotoDto ========', downloadPlacePhotoDto);
  }
}
