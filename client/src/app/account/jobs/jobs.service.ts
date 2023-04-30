import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Area, Job } from 'src/app/shared/models/job';
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
  jobs: Job[] = [];
  pagination?: Pagination<Job[]>;
  jobCache = new Map<string, Pagination<Job[]>>();

  constructor(private http: HttpClient) { }

  getAll(useCache = true): Observable<Pagination<Job[]>> {
    if (!useCache) this.jobCache = new Map();

    if(this.jobCache.size > 0 && useCache) {
      if (this.jobCache.has(Object.values(this.params).join('-'))) {
        this.pagination = this.jobCache.get(Object.values(this.params).join('-'));
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.params.areaId > 0) params = params.append('areaId', this.params.areaId);
    if (this.params.userId > 0) params = params.append('userId', this.params.userId);
    params = params.append('sort', this.params.sort);
    params = params.append('pageIndex', this.params.pageNumber);
    params = params.append('pageSize', this.params.pageSize);
    if (this.params.search) params = params.append('search', this.params.search);

    return this.http.get<Pagination<Job[]>>(this.baseUrl + 'jobs', {params}).pipe(
      map(response => {
        this.jobCache.set(Object.values(this.params).join('-'), response);
        this.pagination = response;
        return response;
      })
    )
  }

  getById(id: number) {
    const job = [...this.jobCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Job)

    if (Object.keys(job).length !== 0) return of(job);

    return this.http.get<Job>(this.baseUrl + 'jobs/' + id);
  }

  add(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl + 'jobs', job).pipe(
      tap((newJob: Job) => {
        // add the new job to the cache
        if (this.jobCache.size > 0) {
          const cacheKeys = Array.from(this.jobCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.jobCache.get(key)!;
            // check if the new job matches the current filter criteria
            if (cacheValue.data.length < cacheValue.pageSize && this.paramsMatchFilterCriteria(newJob)) {
              cacheValue.data.push(newJob);
              cacheValue.count += 1;
              this.jobCache.set(key, cacheValue);
            }
          }
        }
      })
    );
  }

  private paramsMatchFilterCriteria(job: Job): boolean {
    // check if the job matches the current filter criteria
    const params = this.getParams();
    return (params.areaId === 0 || job.jobArea.area.id === params.areaId)
      && (params.search === '' || job.name.toLowerCase().includes(params.search.toLowerCase()))
      && (params.userId === 0 || job.userJob.userId === params.userId);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}jobs/${id}`;

    return this.http.delete<void>(url).pipe(
      tap(() => {
        // remove the deleted job from the cache if it exists
        if (this.jobCache.size > 0) {
          const cacheKeys = Array.from(this.jobCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.jobCache.get(key)!;
            const index = cacheValue.data.findIndex(job => job.id === id);
            if (index !== -1) {
              // remove the job from the cache
              cacheValue.data.splice(index, 1);
              cacheValue.count -= 1;
              this.jobCache.set(key, cacheValue);
            }
          }
        }
      })
    );
  }

  edit(req: any): Observable<any> {
    return this.http.put(this.baseUrl + 'jobs', req).pipe(
      tap((res: any) => {
        const updatedJob = res as Job;
        // update the job in the cache if it exists
        if (this.jobCache.size > 0) {
          const cacheKeys = Array.from(this.jobCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.jobCache.get(key)!;
            const index = cacheValue.data.findIndex(s => s.id === updatedJob.id);
            if (index !== -1) {
              // update the job in the cache
              cacheValue.data[index] = updatedJob;
              this.jobCache.set(key, cacheValue);
            }
          }
        }
      }),
      map((res: any) => {
        return res;
      })
    );
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
