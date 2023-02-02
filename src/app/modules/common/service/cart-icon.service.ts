import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartIconService {
  subject: Subject<Number> = new Subject();
  
  constructor() { }

  cartChanged(counter: number){
    this.subject.next(counter);
  }
}