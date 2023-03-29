import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private isDevEnvSource = new ReplaySubject<boolean>(1);
  isDevEnv$ = this.isDevEnvSource.asObservable();

  constructor() {
    this.isDevEnvSource.next(true);
    if (environment.production === true) {
      this.isDevEnvSource.next(false);
    }
  }

}
