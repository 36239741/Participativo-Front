import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveFormService {
form: BehaviorSubject<any> = new BehaviorSubject<any>(null);
constructor() { }

  save(form: any) {
    this.form.next(form);
  }
  get() {
    return this.form;
  }
  delete() {
    this.form.next(null);
  }
}
