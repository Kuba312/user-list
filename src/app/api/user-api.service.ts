import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { commonEnvironment } from 'src/environments/environment.common';
import { UserDto } from './models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  getUsersList(page: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      commonEnvironment.API_HOST_URL +
      `${commonEnvironment.apiEndpoints.USERS}?page=${page}`
    )
      .pipe(
        map((users: any) => {
          users.data = users.data.map((user: UserDto) => {
            user.isFavourite = JSON.parse(localStorage?.getItem('favoriteUsers'))?.includes(user.id) ?? false;
            user.fullName = `${user.first_name} ${user.last_name}`
            return user;
          })
          return users;
        })
      )
  };

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(
      commonEnvironment.API_HOST_URL +
      `${commonEnvironment.apiEndpoints.USERS}/${id}`
    )
      .pipe(
        map((user: any) => {
          user.data.isFavourite = JSON.parse(localStorage?.getItem('favoriteUsers'))?.includes(user.data.id) ?? false;
          return user;
        }),
        map((response: any) => response?.data)
      )
  }
}
