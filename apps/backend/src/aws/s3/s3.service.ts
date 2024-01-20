import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import stream from 'stream';
import { v4 as uuid } from 'uuid';
import { awsConfig } from '../../config';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;

  constructor(
    @Inject(awsConfig.KEY) private readonly config: ConfigType<typeof awsConfig>
  ) {
    this.s3Client = new S3Client({});
  }

  async uploadObjectFromStream(readableStream: stream.Readable) {
    const passThroughStream = new stream.PassThrough();

    const parallelUploads3 = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.config.bucket,
        Key: `${uuid()}.jpg`,
        Body: passThroughStream,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
      },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    });
    readableStream.pipe(passThroughStream);
    return parallelUploads3.done();
  }
}
