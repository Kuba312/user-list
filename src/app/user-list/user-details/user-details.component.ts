import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/api/models/userDto';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  user?: UserDto;

  constructor(private route: ActivatedRoute, private readonly router: Router) { }


  ngOnInit(): void {
    this.getDataFromResolver();
  }


  private getDataFromResolver(): void {
    this.route.data.subscribe((data: any): void => {
      this.user = data['0'];
    })
  }

  backToPreviousPage(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }


}
