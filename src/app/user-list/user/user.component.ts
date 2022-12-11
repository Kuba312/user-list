import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/app/api/models/userDto';
import { AppMessageService } from 'src/app/services/app-message-service/app-message.service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {


  @Input() userDetails?: UserDto;
  addedUsers: number[] = [];

  constructor(
    private userService: UserListService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.addedUsers = JSON?.parse(this.localStorageService.getData('favoriteUsers')) ?? [];
  }


  addToFavorite(userId?: number) {
    this.userDetails.isFavourite = !this.userDetails.isFavourite
    if (this.userDetails.isFavourite) {
      this.userService.saveFavouriteUser(userId, this.addedUsers);
      return;
    }
    this.userService.removeFavouriteUser(userId);
  }
}
