import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DownloadPlacePhotoInterface } from '@types';
import { lastValueFrom } from 'rxjs';
import * as stream from 'stream';
import { S3Service } from '../aws/s3/s3.service';
import { telegramConfig } from '../config';
import { PlacesService } from '../places/places.service';

@Injectable()
export class PhotosService {
  private readonly logger = new Logger(PhotosService.name);

  constructor(
    private readonly s3Service: S3Service,
    private readonly httpService: HttpService,
    private readonly placesService: PlacesService,
    @Inject(telegramConfig.KEY)
    private readonly telegramConfiguration: ConfigType<typeof telegramConfig>
  ) {}

  async download(downloadPlacePhotoDto: DownloadPlacePhotoInterface) {
    const { photoPath, placeId } = downloadPlacePhotoDto;

    const url = `${this.telegramConfiguration.fileStoragePath}${this.telegramConfiguration.token}/${photoPath}`;

    try {
      const fileStream = await lastValueFrom(
        this.httpService.get<stream.Readable>(url, {
          responseType: 'stream',
        })
      );

      const uploadResult = await this.s3Service.uploadObjectFromStream(
        fileStream.data
      );

      await this.placesService.updatePhoto(placeId, uploadResult.Location);
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
