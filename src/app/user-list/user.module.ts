import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    OrderListModule,
    PaginatorModule,
    ButtonModule,
    MessagesModule
  ]
})
export class UserModule { }
