import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { Injectable } from '@nestjs/common';
import { s3Config } from 'app.config';

@Injectable()
export class S3Service {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: s3Config.accessKeyId,
            secretAccessKey: s3Config.secretAccessKey,
            region: s3Config.region,
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const filename = uuidv4();

        const buffer = await sharp(file.buffer).resize(400).toBuffer();

        const params = {
            Bucket: s3Config.bucket,
            Key: filename,
            Body: buffer,
            ACL: 'public-read',
        };

        await this.s3.upload(params).promise();

        return filename;
    }

    async removeFile(filename: string) {
        const params = {
            Bucket: s3Config.bucket,
            Key: filename,
        };

        return this.s3.deleteObject(params).promise();
    }
}
