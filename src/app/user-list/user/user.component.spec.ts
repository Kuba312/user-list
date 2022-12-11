import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipModule } from 'primeng/tooltip';
import { USER_MOCK } from 'server/db-data';
import { AppMessageService } from 'src/app/services/app-message-service/app-message.service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { UserListService } from '../user-list.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let el: DebugElement;

  let localStorageService: any;
  let userService: any;
  let appMessageService: any;

  beforeEach(waitForAsync (() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['getData']);
    userService = jasmine.createSpyObj('UserListService', ['saveFavouriteUser', 'removeFavouriteUser']);
    appMessageService = jasmine.createSpyObj('AppMessageService', ['success', 'danger']);
     TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        TooltipModule
      ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: UserListService, useValue: userService },
        { provide: AppMessageService, useValue: appMessageService }
      ]
    })
      .compileComponents().then(()=>{
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        component.userDetails = USER_MOCK;
        el = fixture.debugElement;
        localStorageService.getData.and.returnValue('[1,2]');
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispaly user data', () => {
    let avatar = el.query(By.css('.user__basic-info--avatar'));
    let fullName = el.query(By.css('.user__basic-info--name'));
    expect(avatar.nativeElement.getAttribute('src')).toBe('https://reqres.in/img/faces/1-image.jpg');
    expect(fullName.nativeElement.textContent).toBe(' George Bluth ');
  });

  it('should call addToFavorite when user click on star', () => {
    spyOn(component, 'addToFavorite');
    let star = el.query(By.css('.user__star'));
    star.nativeElement.click();
    fixture.detectChanges();

    expect(component.addToFavorite).toHaveBeenCalled();
  })

  it('should add user to favorites', () => {
    component.addToFavorite(1);
    fixture.detectChanges();
   
    expect(userService.saveFavouriteUser).toHaveBeenCalled();
    expect(component.userDetails.isFavourite).toBe(true);
  });

  it('should remove user from favorites', () => {
    component.userDetails.isFavourite = true;
    component.addToFavorite(1);
    fixture.detectChanges();

    expect(userService.removeFavouriteUser).toHaveBeenCalled();
    expect(component.userDetails.isFavourite).toBe(false);
  })

});
