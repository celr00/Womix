import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Area, Job } from 'src/app/shared/models/job';
import { JobWithInterest } from 'src/app/shared/models/job-with-interest';
import { JobsParams } from 'src/app/shared/models/jobs-params';
import { Pagination } from 'src/app/shared/models/pagination';
import { UserJobInterest } from 'src/app/shared/models/user-job-interest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;
  params = new JobsParams();
  areas: Area[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pagination<Job[]>> {
    let params = new HttpParams();

    if (this.params.areaId > 0) params = params.append('areaId', this.params.areaId);
    if (this.params.userId > 0) params = params.append('userId', this.params.userId);
    params = params.append('sort', this.params.sort);
    params = params.append('pageIndex', this.params.pageNumber);
    params = params.append('pageSize', this.params.pageSize);
    if (this.params.search) params = params.append('search', this.params.search);

    return this.http.get<Pagination<Job[]>>(this.baseUrl + 'jobs', {params});
  }

  add(service: any) {
    return this.http.post(this.baseUrl + 'jobs', service);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'jobs/' + id);
  }

  edit(service: any) {
    return this.http.put(this.baseUrl + 'jobs', service);
  }

  getById(id: number): Observable<JobWithInterest> {
    return this.http.get<JobWithInterest>(this.baseUrl + 'jobs/' + id);
  }

  getInterestedJobsList(): Observable<UserJobInterest[]> {
    return this.http.get<UserJobInterest[]>(this.baseUrl + 'jobs/follow');
  }

  follow(jobId: number): Observable<void> {
    return this.http.post<void>(this.baseUrl + `jobs/follow/${jobId}`, {});
  }

  unfollow(jobId: number): Observable<void> {
    return this.http.post<void>(this.baseUrl + `jobs/unfollow/${jobId}`, {});
  }

  getAreas(): Observable<Area[]> {
    if (this.areas.length > 0) return of(this.areas);

    return this.http.get<Area[]>(this.baseUrl + 'jobs/areas').pipe(
      map(areas => {
        this.areas = areas;
        return areas
      })
    );
  }

  deletePhoto(photoId: number, serviceId: number): Observable<Job> {
    let params = new HttpParams();

    params = params.append('photoId', photoId);
    params = params.append('serviceId', serviceId);

    return this.http.delete<Job>(this.baseUrl + 'jobs/photo/delete', {params});
  }

  setParams(params: JobsParams) {
    this.params = params;
  }

  getParams() {
    return this.params;
  }

  resetParams() {
    this.params = new JobsParams();
  }

}
