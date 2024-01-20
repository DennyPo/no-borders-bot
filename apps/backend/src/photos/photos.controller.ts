import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BackendPatternsEnum, DownloadPlacePhotoInterface } from '@types';
import { PhotosService } from './photos.service';

@Controller()
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @EventPattern(BackendPatternsEnum.DOWNLOAD_PLACE_PHOTO)
  download(@Payload() downloadPlacePhotoDto: DownloadPlacePhotoInterface) {
    return this.photosService.download(downloadPlacePhotoDto);
  }
}
