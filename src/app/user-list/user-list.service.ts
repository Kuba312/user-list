import { Injectable } from '@angular/core';
import { AppMessageService } from '../services/app-message-service/app-message.service';
import { LocalStorageService } from '../services/local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  favoriteUsers?: number[] = [];


  constructor(
    private localStorageService: LocalStorageService,
    private appMessageService: AppMessageService
  ) { }


  public saveFavouriteUser(userId: number, addedUsers: number[]): void {
    this.favoriteUsers.push(userId);
    this.localStorageService.saveData('favoriteUsers', JSON.stringify([...addedUsers, ...this.favoriteUsers]));
    this.appMessageService.success('Dodano do ulubionych', 2000);
  }

  public removeFavouriteUser(userId: number) {
    let favUsers = [...new Set(JSON.parse(this.localStorageService.getData('favoriteUsers')))];

    favUsers.splice(favUsers.indexOf(userId), 1);
    this.favoriteUsers.splice(this.favoriteUsers.indexOf(userId), 1);
    this.localStorageService.saveData('favoriteUsers', JSON.stringify(favUsers));
    this.appMessageService.danger('Usunięto z ulubionych', 2000);
  }
}
