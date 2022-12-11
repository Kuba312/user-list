import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { USER_MOCK } from 'server/db-data';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let el: DebugElement;
  let router: Router;
  let routerSpy: any;

  beforeEach(waitForAsync(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
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
  
});
