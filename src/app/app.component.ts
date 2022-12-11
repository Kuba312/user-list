import { Component, OnInit } from '@angular/core';
import { UserApiService } from './api/user-api.service';
import { LoaderService } from './services/loader-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'user-list-app';

  constructor(public loaderService: LoaderService){}



  ngOnInit(): void {
   
  }

  
}
