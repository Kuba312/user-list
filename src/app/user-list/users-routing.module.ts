import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDetailsResolver } from "./resolver/user-details.resolver";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserListComponent } from "./user-list.component";

const routes: Routes = [
    {
      path: '', component: UserListComponent, children: [
        { path: ':id', component: UserDetailsComponent, resolve: [UserDetailsResolver] },
      ]
    }
  ]


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }