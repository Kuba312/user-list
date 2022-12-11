import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserDto } from '../../api/models/userDto';
import { UserApiService } from '../../api/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolver implements Resolve<UserDto> {


  constructor(private userApiService: UserApiService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDto> {
    return this.userApiService.getUserById(route.params['id']);
  }
}