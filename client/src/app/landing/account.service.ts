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

  constructor(private http: HttpClient, private router: Router, private presenceService: PresenceService) { }

  login(values: any) {
    return this.http.post<Account>(this.baseUrl + 'account/login', values).pipe(
      map(account => {
        this.setCurrentAccount(account);
      })
    )
  }

  register(values: any) {
    return this.http.post<Account>(this.baseUrl + 'account/register', values).pipe(
      map(account => {
        this.setCurrentAccount(account);
      })
    )
  }

  removePhoto() {
    
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
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
  }

  resetPassword(obj: any): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'account/password-reset', obj);
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'account');
  }

  getUser(): Observable<AppUser> {
    return this.http.get<AppUser>(this.baseUrl + 'users');
  }

  getUserEntity(): Observable<UserEntity> {
    return this.http.get<UserEntity>(this.baseUrl + 'users/entity');
  }

  update(user: any): Observable<UserEntity> {
    return this.http.put<UserEntity>(this.baseUrl + 'account', user);
  }

  getAccountToken(): string {
    const token = JSON.parse(localStorage.getItem('account')!);
    return localStorage.getItem(token)!;
  }
}
