import { TestBed } from '@angular/core/testing';
import { AppMessageService } from '../services/app-message-service/app-message.service';
import { LocalStorageService } from '../services/local-storage-service/local-storage.service';

import { UserListService } from './user-list.service';

describe('UserListService', () => {
  let service: UserListService;
  let localStorageService: any;
  let appMessageService: any;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['saveData', 'getData']);
    appMessageService = jasmine.createSpyObj('AppMessageService', ['success', 'danger']);
    TestBed.configureTestingModule({
      providers: [
        UserListService,
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: AppMessageService, useValue: appMessageService }
      ],
    });
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save users in local storage', () => {
    service.favoriteUsers = [1,2];
    service.saveFavouriteUser(1, [3,4]);

    expect(localStorageService.saveData).toHaveBeenCalled();
    expect(appMessageService.success).toHaveBeenCalled();
  });

  it('should remove users from local storage', () => {
    localStorageService.getData.and.returnValue('[2]');
    service.favoriteUsers = [1,2];
    service.removeFavouriteUser(1);

    expect(localStorageService.getData).toHaveBeenCalled();
    expect(localStorageService.saveData).toHaveBeenCalled();
    expect(appMessageService.danger).toHaveBeenCalled();
  })
});
