import { Injectable } from '@angular/core';
import { Job } from '../job';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  favoriteJobs: Job[] = [];

  constructor() { }

  toggleFavorite(job: Job): void {
    const index = this.favoriteJobs.findIndex(favJob => favJob.id === job.id);
    if (index !== -1) {
      // Job already favorited, remove it
      this.favoriteJobs.splice(index, 1);
    } else {
      // Job not favorited, add it to favorites
      this.favoriteJobs.push(job);
    }
  }

  getFavoriteJobs(): Job[] {
    return this.favoriteJobs;
  }

  isFavorite(jobId: number): boolean {
    return this.favoriteJobs.some(job => job.id === jobId);
  }
}
