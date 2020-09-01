import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioUseCase } from 'src/app/Core/Usecases/UsuarioUseCase';

export enum EType {
  Usuario = 'us',
  Publicacao = 'pb'
}

@Injectable({
  providedIn: 'root'
})
export class ImgRepositoryService {

constructor(private http: HttpClient) { }

    upload(file: File, type: string, uuid: string) {
      let url: string;
      const formData: FormData = new FormData();

      if (type === 'us') {
        url = 'upload/avatar'
        formData.append('file', file);

      } else {
        url = 'upload/image';
        formData.append('file', file);
        formData.append('publicacao', uuid);
      }
      return this.http.post(environment.API_URL + url, formData);

    }

    download(uuid: string, type: string) {
      let url: string;
      url = type === 'us' ? environment.IMG_URL_USER : environment.IMG_URL_PUBLICATION;
      return this.http.get(environment.API_URL + type + uuid);
    }
}
