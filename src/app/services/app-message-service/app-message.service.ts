import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  constructor(private messageServivce: MessageService) { }


  success(detail: string, life?: number): void {
    this.showMessage('success', '', detail, life);

  }

  danger(detail: string, life?: number): void {
   this.showMessage('error', '', detail, life);
  }

  private showMessage(severity: string, summary: string, detail: string, life = 3000): void {
    this.messageServivce.add({
      severity,
      summary,
      detail,
      life
    })
  }
}
