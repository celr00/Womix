import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../shared/models/pagination';
import { Photo } from '../shared/models/photo';
import { PhotoParams } from '../shared/models/photo-params';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  params = new PhotoParams();
  pagination?: Pagination<Photo[]>;
  photoCache = new Map<string, Pagination<Photo[]>>();

  constructor(private http: HttpClient) { }

  getAll(useCache = true): Observable<Pagination<Photo[]>> {
    if (!useCache) this.photoCache = new Map();

    if(this.photoCache.size > 0 && useCache) {
      if (this.photoCache.has(Object.values(this.params).join('-'))) {
        this.pagination = this.photoCache.get(Object.values(this.params).join('-'));
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    params = params.append('visible', this.params.visible);
    params = params.append('sort', this.params.sort);
    params = params.append('pageIndex', this.params.pageNumber);
    params = params.append('pageSize', this.params.pageSize);
    if (this.params.search) params = params.append('search', this.params.search);

    return this.http.get<Pagination<Photo[]>>(this.baseUrl + 'admin/photos', {params}).pipe(
      map(response => {
        this.photoCache.set(Object.values(this.params).join('-'), response);
        this.pagination = response;
        return response;
      })
    )
  }

  changePhotoVisibility(id: number): Observable<Photo> {
    return this.http.put<Photo>(this.baseUrl + 'admin/photos/' + id, {}).pipe(
      map(res => {
        return res;
      })
    )
  }

  setParams(params: PhotoParams) {
    this.params = params;
  }

  getParams() {
    return this.params;
  }

  resetParams() {
    this.params = new PhotoParams();
  }
}
