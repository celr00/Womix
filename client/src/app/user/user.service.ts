import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(this.baseUrl + 'users/' + id);
  }

  getUserByEmail(email: string): Observable<AppUser> {
    return this.http.get<AppUser>(this.baseUrl + 'users/email/' + email);
  }

  save(email: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + `likes/save/${email}`, {});
  }

  unsave(email: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + `likes/unsave/${email}`, {});
  }

  isSaved(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + `likes/${email}`);
  }

  getSavedUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.baseUrl + `likes`);
  }
}
