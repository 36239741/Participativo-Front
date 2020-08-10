import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PageEndService {
behavior = new BehaviorSubject<boolean>(false);

constructor() { }

setBehavior(pageEnd: boolean) {
  this.behavior.next(pageEnd);
}
getBehavior(): Observable<boolean> {
  return this.behavior;
}
}
