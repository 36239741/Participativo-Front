import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {

constructor(private http: HttpClient) { }

    readNotifications(httpParamas: HttpParams) {
      return this.http.put(environment.API_URL + 'notificacoes','', {params: httpParamas});
    }
}
