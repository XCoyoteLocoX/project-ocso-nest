import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {

    private bucket = process.env.bucket_name!;

    private s3 = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.accesskey_bucket!,
            secretAccessKey: process.env.secretKey_bucket!,
        }
    });

    async uploadFile(file: Express.Multer.File) {
        const Key = file.originalname;
        const url = `https://nest-ocso-test-aldebaran.s3.amazonaws.com/${Key}`
        const bucket = "nest-ocso-test-aldebaran"
        const command = new PutObjectCommand({
            Key,
            Body: file.buffer,
            Bucket: this.bucket,
            ContentType: file.mimetype, // opcional pero recomendado
        });
        await this.s3.send(command);
        return url;
    }
}
