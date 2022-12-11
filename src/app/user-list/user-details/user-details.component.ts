import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/api/models/userDto';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  user?: UserDto;
  addedUsers?: number[] = [];
  constructor(
    private route: ActivatedRoute, 
    private readonly router: Router,
    private userService: UserListService,
    private localStorageService: LocalStorageService) { }


  ngOnInit(): void {
    this.getDataFromResolver();
    this.addedUsers = JSON?.parse(this.localStorageService.getData('favoriteUsers')) ?? [];
  }


  private getDataFromResolver(): void {
    this.route.data.subscribe((data: any): void => {
      this.user = data['0'];
    })
  }


  addToFavorite(userId?: number) {
    this.user.isFavourite = !this.user.isFavourite
    if (this.user.isFavourite) {
      this.userService.saveFavouriteUser(userId, this.addedUsers);
      return;
    }
    this.userService.removeFavouriteUser(userId);
  }


  backToPreviousPage(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


}
