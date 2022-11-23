import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminMessageService } from '../admin-message.service';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit, OnDestroy {

  messages: Array<string> = [];
  private clickCounter: number = 0;

  constructor(
    private adminMessageService: AdminMessageService
  ) { }
  
  ngOnInit(): void {
    this.adminMessageService.subject.subscribe(messages => {
      this.messages = messages;
      this.timeoutCloseMessages();
    });
  }
  

  clearMessages(){
    this.messages = [];
    this.adminMessageService.clear();
  }
  
  ngOnDestroy(): void {
    this.adminMessageService.subject.unsubscribe();//dzieki temu przy niszczemu tego komponentu bedziemy chcieli,
    //sie odsubksrybować od tego serwisu ktory mamy po to zeby uniknac w ten sposob wyciekow w pamieci
  }
  
  private timeoutCloseMessages() {
    this.clickCounter++;
    setTimeout(() => {
      if (this.clickCounter == 1) {
        this.clearMessages();
      }
      this.clickCounter--;
    }, 12000);
  }

}
