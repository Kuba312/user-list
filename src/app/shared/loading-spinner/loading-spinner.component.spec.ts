import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(waitForAsync(() => {
     TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerComponent ],
      imports:[
        ProgressSpinnerModule
      ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(LoadingSpinnerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
