import { PipeTransform, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  constructor(
    private http: HttpClient,
  ) {}

  async transform(src: string, args?: any): Promise<string> {
    if(src.split('=')[1] != 'null') {   
    const headers = new HttpHeaders({'Authorization': `${localStorage.getItem('token')}`});
    const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
      })
    }else {
      return args
    }
  }
}