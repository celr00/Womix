import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/landing/account.service';
import { EnvironmentService } from '../services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class DevGuard implements CanActivate {
  constructor(private environmentService: EnvironmentService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.environmentService.isDevEnv$.pipe(
      map(env => {
        if (env) return true;
        else {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    );
  }
}
