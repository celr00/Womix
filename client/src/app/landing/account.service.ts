import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, of, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../shared/models/app-user';
import { UserEntity } from '../shared/models/app-user-entity';
import { Account } from '../shared/models/account';
import { PresenceService } from '../_services/presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentAccountSource = new ReplaySubject<Account | null>(1);
  currentAccount$ = this.currentAccountSource.asObservable();
  private account?: AppUser;
  private userEntity?: UserEntity;

  constructor(private http: HttpClient, private router: Router, private presenceService: PresenceService) { }

  login(values: any) {
    return this.http.post<Account>(this.baseUrl + 'account/login', values).pipe(
      map(account => {
        this.setCurrentAccount(account);
        this.router.navigateByUrl('/account/summary');
      })
    )
  }

  register(values: any) {
    return this.http.post<Account>(this.baseUrl + 'account/register', values).pipe(
      map(account => {
        this.setCurrentAccount(account);
        this.router.navigateByUrl('/account/summary');
      })
    )
  }

  setCurrentAccount(account: Account) {
    localStorage.setItem('account', JSON.stringify(account));
    this.currentAccountSource.next(account);
    this.presenceService.createHubConnection(account);
  }

  logout() {
    localStorage.removeItem('account');
    this.currentAccountSource.next(null);
    this.router.navigateByUrl('/sign-in');
    this.presenceService.stopHubConnection();
    this.account = undefined;
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
  }

  loggedIn(): boolean {
    let key = false;
    const account = localStorage.getItem('account');
    if (account !== null) {
      key = true;
    }
    return key;
  }

  resetPassword(obj: any): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'account/password-reset', obj);
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'account');
  }

  getUser(): Observable<AppUser> {
    if (this.account) return of(this.account);

    return this.http.get<AppUser>(this.baseUrl + 'users').pipe(
      map(response => {
        this.account = response;
        return response;
      })
    )
  }

  // User Entity

  getUserEntity(): Observable<UserEntity> {
    if (this.userEntity) return of(this.userEntity);

    return this.http.get<UserEntity>(this.baseUrl + 'users/entity').pipe(
      map(res => {
        this.userEntity = res;
        return res;
      })
    )
  }

  update(user: any): Observable<UserEntity> {
    return this.http.put<UserEntity>(this.baseUrl + 'account', user).pipe(
      map(res => {
        this.userEntity = res;
        return res;
      })
    )
  }

  removePhoto(userId: number): Observable<UserEntity> {
    return this.http.delete<UserEntity>(this.baseUrl + 'account/photo/' + userId).pipe(
      map(res => {
        this.userEntity = res;
        return res;
      })
    )
  }

  // Account

  getAccountToken(): string {
    const token = JSON.parse(localStorage.getItem('account')!);
    return localStorage.getItem(token)!;
  }

  getAccount(): Account | null {
    const accountStr = localStorage.getItem('account');
    if (accountStr === null) return null;
    const account: Account = JSON.parse(accountStr);
    return account;
  }

  getAccountId(): number {
    const accountStr = localStorage.getItem('account');
    const account: Account = JSON.parse(accountStr!);
    return account.id;
  }
}
