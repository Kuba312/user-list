import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { UserApiService } from './user-api.service';
import { USERS_LIST_MOCK, USER_LIST_MOCK } from 'server/db-data';
import { UserDto } from './models/userDto';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApiService]
    });
    service = TestBed.inject(UserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all users', () => {
    service.getUsersList(1)
      .subscribe((users: any) => {
        expect(users).toBeTruthy();
        expect(users.data.length).toBe(6);
        expect(users.per_page).toBe(6);
      });
    const request = httpTestingController.expectOne('https://reqres.in/api/users?page=1');

    expect(request.request.method).toBe('GET');
    request.flush(USERS_LIST_MOCK);
  });

  it('should get user by id', () => {
    service.getUserById(1)
      .subscribe((user: UserDto) => {
        expect(user[0]).toBeTruthy();
        expect(user[0].id).toBe(1);
      })
    const request = httpTestingController.expectOne('https://reqres.in/api/users/1');

    request.flush(USER_LIST_MOCK);
    expect(request.request.method).toEqual('GET');

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
