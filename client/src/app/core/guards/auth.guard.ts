import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/landing/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private accountService: AccountService, private router: Router) {
    
  }

  canActivate(
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentAccount$.pipe(
      map(auth => {
        if (auth !== null) {
          return true;
        }
        else {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    );
  }
}
