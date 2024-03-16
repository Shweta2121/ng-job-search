import { Component } from '@angular/core';
import { Job } from '../../job';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule], 
})
export class FavoriteListComponent {
  favoriteJobs: Job[] = [];

  constructor(private router: Router,private sharedDataService: SharedService) {}

  ngOnInit() {
    this.sharedDataService.favoriteJobs$.subscribe(jobs => {
      this.favoriteJobs = jobs; // Update component's favoriteJobs
      console.log(this.favoriteJobs); // Verify data received
    });
  }

  navigateToJobDetails(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }

}
