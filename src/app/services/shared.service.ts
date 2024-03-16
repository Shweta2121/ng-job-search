import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Job } from '../job';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private favoriteJobsSubject = new BehaviorSubject<Job[]>([]);
  favoriteJobs$ = this.favoriteJobsSubject.asObservable();

  setFavoriteJobs(jobs: Job[]) {
      this.favoriteJobsSubject.next(jobs);
  }
}