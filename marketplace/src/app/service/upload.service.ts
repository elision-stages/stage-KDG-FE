import {Injectable} from '@angular/core';
import {S3} from "aws-sdk";

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor() {
  }

  fileUpload(file) {
    console.log("uploading")
    const fileType = file.type;
    const bucket = new S3(
      {
        accessKeyId: 'blabla',
        secretAccessKey: 'ietsanders',
        region: 'home-computer'
      }
    )
    const params = {
      Bucket: 'test',
      Key: file.name,
      Body: file,
      ACL: 'readwrite',
      ContentType: fileType
    }

    bucket.upload(params, function (err: any, data: any) {
      if(err) console.log(err);
      console.log(data);
    })

  }
}
