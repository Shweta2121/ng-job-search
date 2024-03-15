import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService } from '../../services/job-api.service';
import { Job } from '../../job';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobDetails: any | undefined;
  isLoading: boolean = false; // Variable to track loading state

  constructor(private route: ActivatedRoute, private jobService: JobApiService, private router: Router) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const jobId = +params['id'];
    this.loadJobDetails(jobId);
  }
  
  loadJobDetails(jobId: number) {
    this.isLoading = true; // Set loading state to true
    this.jobService.getJobById(jobId).subscribe({
      next: (data: Job) => {
        this.jobDetails = data;
        this.isLoading = false; // Set loading state to false once data is fetched
      },
      error: (error) => {
        console.error('Error fetching job details:', error);
        this.isLoading = false; // Set loading state to false in case of error
      }
    });
  }

  goBack(){
    this.router.navigate(['/jobs']);
  }
}
