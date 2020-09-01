import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindPublicationBehaviorService {
  behavior: BehaviorSubject<any> = new BehaviorSubject<any>(null);
constructor() { }
  set(descricao: string) {
    this.behavior.next(descricao);
  }
  get() {
    return this.behavior;
  }

}
