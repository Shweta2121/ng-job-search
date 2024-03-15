import { Component } from '@angular/core';
import { Job } from '../../job';
import { FavouriteService } from '../../services/favourite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent {
  favoriteJobs: Job[] = [];

  constructor(private favoriteService: FavouriteService,private router: Router) {}

  ngOnInit(): void {
    this.favoriteJobs = this.favoriteService.getFavoriteJobs();
  }

  navigateToJobDetails(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }

}
