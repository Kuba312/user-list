import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { LoaderService } from './services/loader-service/loader.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let loaderService: any;

  beforeEach(waitForAsync(() => {
    loaderService = jasmine.createSpyObj('LoaderService', [''],['isLoading$']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(LoadingSpinnerComponent)
      ],
      providers: [
        { provide: LoaderService, useValue: loaderService }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
