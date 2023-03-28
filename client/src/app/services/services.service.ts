import { Injectable } from '@angular/core';
import { ServiceParams } from '../shared/models/service-params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, of } from 'rxjs';
import { Pagination } from '../shared/models/pagination';
import { Category, Service } from '../shared/models/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = environment.apiUrl;
  params = new ServiceParams();
  categories: Category[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pagination<Service[]>> {
    let params = new HttpParams();

    if (this.params.categoryId > 0) params = params.append('categoryId', this.params.categoryId);
    if (this.params.userId > 0) params = params.append('userId', this.params.userId);
    params = params.append('sort', this.params.sort);
    params = params.append('pageIndex', this.params.pageNumber);
    params = params.append('pageSize', this.params.pageSize);
    if (this.params.search) params = params.append('search', this.params.search);

    return this.http.get<Pagination<Service[]>>(this.baseUrl + 'services', {params});
  }

  add(service: any) {
    return this.http.post(this.baseUrl + 'services', service);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'services/' + id);
  }

  edit(service: any) {
    return this.http.put(this.baseUrl + 'services', service);
  }

  getById(id: number) {
    return this.http.get<Service>(this.baseUrl + 'services/' + id);
  }

  getCategories(): Observable<Category[]> {
    if (this.categories.length > 0) return of(this.categories);

    return this.http.get<Category[]>(this.baseUrl + 'services/categories').pipe(
      map(categories => {
        this.categories = categories;
        return categories
      })
    );
  }

  deletePhoto(photoId: number, serviceId: number): Observable<Service> {
    let params = new HttpParams();

    params = params.append('photoId', photoId);
    params = params.append('serviceId', serviceId);

    return this.http.delete<Service>(this.baseUrl + 'services/photo/delete', {params});
  }

  setParams(params: ServiceParams) {
    this.params = params;
  }

  getParams() {
    return this.params;
  }

  resetParams() {
    this.params = new ServiceParams();
  }

}
