import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, of, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../shared/models/app-user';
import { UserEntity } from '../shared/models/app-user-entity';
import { Account } from '../shared/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<Account | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getUser(): Observable<AppUser> {
    return this.http.get<AppUser>(this.baseUrl + 'users');
  }

  getUserEntity(): Observable<UserEntity> {
    return this.http.get<UserEntity>(this.baseUrl + 'users/entity');
  }

  update(user: any): Observable<UserEntity> {
    return this.http.put<UserEntity>(this.baseUrl + 'account', user);
  }

  loadCurrentUser(token: string | null) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<Account>(this.baseUrl + 'account', {headers}).pipe(
      map(res => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          this.currentUserSource.next(res);
          return res;
        } else {
          return null;
        }
      })
    )
  }

  getUserToken(): string {
    const token = JSON.parse(localStorage.getItem('user')!);
    return localStorage.getItem(token)!;
  }

  login(values: any) {
    return this.http.post<Account>(this.baseUrl + 'account/login', values).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.currentUserSource.next(res);
      })
    )
  }

  register(values: any) {
    return this.http.post<Account>(this.baseUrl + 'account/register', values).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.currentUserSource.next(res);
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
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

}
