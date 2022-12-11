import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorage: any;
  beforeEach(() => {
    localStorage = {};
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data to localStorage', () => {
    spyOn(Storage.prototype, 'setItem');
    service.saveData('favoriteUsers', '[1,2,3]');
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
  })

  it('should get data from localStorage', () => {
    spyOn(Storage.prototype, 'getItem');
    service.getData('favoriteUsers');
    expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
  });

  it('should clear data from localStorage', () => {
    spyOn(Storage.prototype, 'clear');
    service.clearData();
    expect(Storage.prototype.clear).toHaveBeenCalledTimes(1);
  });


});
