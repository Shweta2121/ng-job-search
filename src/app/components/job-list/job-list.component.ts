import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../../job';
import { JobApiService } from '../../services/job-api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule], 
  providers: [JobApiService], // Provide services here
})
export class JobListComponent implements OnInit {
  jobList: Job[] = [];
  favoriteJobs: Job[] = [];

  constructor(private jobApiService: JobApiService, private router: Router,
    private sharedDataService:SharedService) {}

  ngOnInit(): void {
    this.loadJobList();
    this.sharedDataService.favoriteJobs$.subscribe(jobs => {
      this.favoriteJobs = jobs;
      console.log(this.favoriteJobs );
  });
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

  toggleFavorite(job: Job) {
    const index = this.favoriteJobs.findIndex(favJob => favJob.id === job.id);
    if (index !== -1) {
      // Job already favorited, remove it
      this.favoriteJobs.splice(index, 1);
    } else {
      // Job not favorited, add it to favorites
      this.favoriteJobs.push(job);
    }
    // Pass the updated favoriteJobs to the Favourite component
    this.sharedDataService.setFavoriteJobs(this.favoriteJobs);
}

isFavorite(jobId: number): boolean {
  return this.favoriteJobs.some(job => job.id === jobId); // Direct check
}


  navigateToJobDetails(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }
}
