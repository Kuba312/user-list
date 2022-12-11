import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, pipe, Subscription } from 'rxjs';
import { UserDto } from '../api/models/userDto';
import { UserApiService } from '../api/user-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {

  users!: UserDto[];
  rows!: number;
  totalRecords!: number;
  subscripton?: Subscription;

  constructor(private userApiService: UserApiService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsersList();
  }


  ngOnDestroy(): void {
    this.subscripton?.unsubscribe();
  }


  paginate(event: any): void {
    this.getUsersList(event.page + 1);
  }

  private getUsersList(pageIndex?: number): void {
    this.subscripton = this.userApiService.getUsersList(pageIndex ?? 1)
      ?.subscribe((users: any) => {
        this.users = users?.data as UserDto[];
        this.rows = users?.per_page;
        this.totalRecords = users?.total;
      });
  }
}
