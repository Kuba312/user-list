import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { AppMessageService } from './app-message.service';

describe('AppMessageService', () => {
  let service: AppMessageService;
  let messageService: any;
  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', ['add']);
    TestBed.configureTestingModule({
      providers: [
        AppMessageService,
        { provide: MessageService, useValue: messageService }
      ]
    });
    service = TestBed.inject(AppMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open notification success bar', () => {
    service.success('DODANO', 0);
    expect(messageService.add).toHaveBeenCalledTimes(1);
  });

  it('should open notification danger bar', () => {
    service.danger('USUNIĘTO', 0);
    expect(messageService.add).toHaveBeenCalledTimes(1);
  });

});
