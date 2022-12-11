import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { USER_MOCK } from 'server/db-data';
import { AppMessageService } from 'src/app/services/app-message-service/app-message.service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { UserListService } from '../user-list.service';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  let localStorageService: any;
  let userService: any;
  let appMessageService: any;

  let el: DebugElement;
  let router: Router;
  let routerSpy: any;

  beforeEach(waitForAsync(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['getData']);
    userService = jasmine.createSpyObj('UserListService', ['saveFavouriteUser', 'removeFavouriteUser']);
    appMessageService = jasmine.createSpyObj('AppMessageService', ['success', 'danger']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        MessagesModule,
        TooltipModule
      ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: UserListService, useValue: userService },
        { provide: AppMessageService, useValue: appMessageService }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        localStorageService.getData.and.returnValue('[1,2]');
        el = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should display user detials', ()=>{
    component.user = USER_MOCK;
    fixture.detectChanges();

    let avatar = el.query(By.css('.details-section__avatar'));
    let fullName = el.query(By.css('.details-section__name'));
    let email = el.query(By.css('.details-section__email'));

    expect(avatar.nativeElement.getAttribute('src')).toBe('https://reqres.in/img/faces/1-image.jpg');
    expect(fullName.nativeElement.textContent).toBe(' George Bluth ');
    expect(email.nativeElement.textContent).toBe(' george.bluth@reqres.in ');
  });

  it('should back to previous page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.backToPreviousPage();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should call addToFavorite when user click on star', () => {
    component.user = USER_MOCK; 
    spyOn(component, 'addToFavorite').and.callThrough();
    let star = el.query(By.css('.details-section__star'));
    star.nativeElement.click();
    fixture.detectChanges();

    expect(component.user.isFavourite).toBe(true);
    expect(userService.saveFavouriteUser).toHaveBeenCalled();

  });

  it('should remove user from favorites', () => {
    component.user = USER_MOCK; 
    component.user.isFavourite = true;
    let star = el.query(By.css('.details-section__star'));
    star.nativeElement.click();
    fixture.detectChanges();

    expect(userService.removeFavouriteUser).toHaveBeenCalled();
    expect(component.user.isFavourite).toBe(false);
  })
  
});
