import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Job } from './job';
import { JobApiService } from './services/job-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-job-search';
  jobList: Job[] = []; 
  activeTab: string = 'jobList'; 
  selectedJob: any = null;  
  favoriteJobs: Job[] = []; 

  constructor(private jobApiService: JobApiService) {
  }

  ngOnInit(): void {
    this.loadJobList();
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
    const index = this.favoriteJobs.findIndex(favJob => favJob.id === job.id);
    if (index !== -1) {
      // Job already favorited, remove it
      this.favoriteJobs.splice(index, 1);
    } else {
      // Job not favorited, add it to favorites
      this.favoriteJobs.push(job);
    }
  }

  isFavorite(jobId: number): boolean {
    return this.favoriteJobs.some(job => job.id === jobId);
  }

  openCity(evt: any, cityName: string) {
    // Update activeTab to show the selected city
    this.activeTab = cityName;
  }
  
    // Method to fetch job details by ID and display them
  displayJobDetails(jobId: number): void {
    this.jobApiService.getJobById(jobId).subscribe({
      next: (data) => {
        this.selectedJob = data;
        // Switch to the 'jobList' tab to display job details
        this.activeTab = 'jobList';
      },
      error: (error) => {
        console.error('Error fetching job details:', error);
      }
    });
  }

  goBack(): void {
    this.selectedJob = null; // Reset selectedJob to show job list again
  }

}
