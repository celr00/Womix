import { Injectable } from '@angular/core';
import { ServiceParams } from '../shared/models/service-params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, of, tap } from 'rxjs';
import { Pagination } from '../shared/models/pagination';
import { Category, Service } from '../shared/models/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = environment.apiUrl;
  params = new ServiceParams();
  categories: Category[] = [];
  services: Service[] = [];
  pagination?: Pagination<Service[]>;
  serviceCache = new Map<string, Pagination<Service[]>>();

  constructor(private http: HttpClient) { }

  getAll(useCache = true): Observable<Pagination<Service[]>> {
    if (!useCache) this.serviceCache = new Map();

    if(this.serviceCache.size > 0 && useCache) {
      if (this.serviceCache.has(Object.values(this.params).join('-'))) {
        this.pagination = this.serviceCache.get(Object.values(this.params).join('-'));
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.params.categoryId > 0) params = params.append('categoryId', this.params.categoryId);
    if (this.params.userId > 0) params = params.append('userId', this.params.userId);
    params = params.append('sort', this.params.sort);
    params = params.append('pageIndex', this.params.pageNumber);
    params = params.append('pageSize', this.params.pageSize);
    if (this.params.search) params = params.append('search', this.params.search);

    return this.http.get<Pagination<Service[]>>(this.baseUrl + 'services', {params}).pipe(
      map(response => {
        this.serviceCache.set(Object.values(this.params).join('-'), response);
        this.pagination = response;
        return response;
      })
    )
  }

  getById(id: number) {
    const service = [...this.serviceCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Service)

    if (Object.keys(service).length !== 0) return of(service);

    return this.http.get<Service>(this.baseUrl + 'services/' + id);
  }

  edit(req: any): Observable<any> {
    return this.http.put(this.baseUrl + 'services', req).pipe(
      tap((res: any) => {
        const updatedService = res as Service;
        // update the service in the cache if it exists
        if (this.serviceCache.size > 0) {
          const cacheKeys = Array.from(this.serviceCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.serviceCache.get(key)!;
            const index = cacheValue.data.findIndex(s => s.id === updatedService.id);
            if (index !== -1) {
              // update the service in the cache
              cacheValue.data[index] = updatedService;
              this.serviceCache.set(key, cacheValue);
            }
          }
        }
      }),
      map((res: any) => {
        return res;
      })
    );
  }

  add(req: any): Observable<Service> {
    return this.http.post<Service>(this.baseUrl + 'services', req).pipe(
      tap((addedService: Service) => {
        // if there's a cache, add the new service to it
        if (this.serviceCache.size > 0) {
          const cacheKeys = Array.from(this.serviceCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.serviceCache.get(key)!;
            cacheValue.data.push(addedService);
            cacheValue.count++;
            this.serviceCache.set(key, cacheValue);
          }
        }
      }),
      map((addedService: Service) => {
        return addedService;
      })
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}services/${id}`;

    return this.http.delete(url).pipe(
      tap(() => {
        // remove the deleted service from the cache
        if (this.serviceCache.size > 0) {
          const cacheKeys = Array.from(this.serviceCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.serviceCache.get(key)!;
            cacheValue.data = cacheValue.data.filter(s => s.id !== id);
            cacheValue.count = cacheValue.count - 1;
            this.serviceCache.set(key, cacheValue);
          }
        }
      }),
      map((res: any) => {
        return res;
      })
    );
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
