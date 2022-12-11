import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader-service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  loaderCount = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.busy();    
    return next.handle(request).pipe(
      finalize(()=>{
        this.loaderService.idle();
      })
    );
  }

}
