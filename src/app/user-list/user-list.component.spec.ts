import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { MessagesModule } from 'primeng/messages';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { USERS_MOCK } from 'server/db-data';
import { UserApiService } from '../api/user-api.service';

import { UserListComponent } from './user-list.component';
import { UserComponent } from './user/user.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let el: DebugElement;
  let userApiService: any;

  beforeEach(async () => {
    userApiService = jasmine.createSpyObj('UserApiService', ['getUsersList']);
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, MockComponent(UserComponent)],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MessagesModule,
        OrderListModule,
        PaginatorModule
      ],
      providers: [
        { provide: UserApiService, useValue: userApiService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.users = USERS_MOCK;
    component.rows = 6;
    component.totalRecords = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper amount of users in the list', () => {
    let users = el.queryAll(By.css('.user-list__item'));

    expect(users.length).toBe(6);
  })

  it('should paginate users list', () => {
    component.paginate(1);
    fixture.detectChanges();

    expect(userApiService.getUsersList).toHaveBeenCalled();
  })
});
