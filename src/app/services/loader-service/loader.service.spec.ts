import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emits isLoading true when loading', fakeAsync(() => {
    service.busyRequestCount = 0;
    service.busy();
    flush();
    service.isLoading$.subscribe(value => {
      expect(value).toBeTruthy();
    })
  }));

  it('should emits isLoading fasle when stop loading', fakeAsync(() => {
    service.busyRequestCount = 1;
    service.idle();
    flush();
    service.isLoading$.subscribe(value => {
      expect(value).toBeFalsy();
    })
  }));

});
