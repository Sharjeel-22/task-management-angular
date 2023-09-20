import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  get loading(): BehaviorSubject<boolean> {
    return this.showLoader;
  }

  set loading(value: boolean) {
    this.showLoader.next(value);
  }
}
