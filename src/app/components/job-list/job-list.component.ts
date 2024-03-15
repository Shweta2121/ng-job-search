import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobApiService } from '../../services/job-api.service';
import { Job } from '../../job';
import { FavouriteService } from '../../services/favourite.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobList: Job[] = [];
  favoriteJobs: Job[] = [];

  constructor(private jobApiService: JobApiService, private router: Router,private favoriteService:FavouriteService) {}

  ngOnInit(): void {
    this.loadJobList();
    this.favoriteJobs = this.favoriteService.getFavoriteJobs(); // Initialize favoriteJobs
  }

  loadJobList() {
    this.jobApiService.getAllJobs().subscribe({
      next: (data: Job[]) => {
        this.jobList = data; 
      },
      error: (error) => {
        console.error('Error fetching job list:', error); 
      }
    });
  }

  toggleFavorite(job: Job): void {
    this.favoriteService.toggleFavorite(job);
    this.favoriteJobs = this.favoriteService.getFavoriteJobs(); // Update favoriteJobs
  }

  isFavorite(jobId: number): boolean {
    return this.favoriteService.isFavorite(jobId); // Check if job is a favorite
  }

  navigateToJobDetails(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }
}
