import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  busyRequestCount = 0;
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  busy() {
    this.busyRequestCount++;
    setTimeout(() => {
      this.isLoading$.next(true);
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      setTimeout(() => {
        this.isLoading$.next(false);
      }, 1000);
    }
  }

}
