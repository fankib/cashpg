import { Injectable } from '@angular/core';

import { Message } from './message';

@Injectable()
export class MessageService {

  block: string = null;
  messages: Message[] = [];

  constructor() { }

  public errorCatcher(){
    return (error) =>{
      console.log(error);
      this.error(error);
      this.unblockUI();
    }
  }

  public blockUI(text){
    if ( text == null || text == ''){
      this.block = null;
    }
    this.block = text;
    return new Promise((resolve, reject) =>{
      setTimeout(resolve, 100);
    });
  }

  public unblockUI(){
    this.block = null;
  }

  public success(text){
    this.addMessage('success', text);
  }

  public error(text){
    this.addMessage('error', text);
  }

  private addMessage(type, text){
    var message = new Message();
    message.type = type;
    message.text = text;
    this.messages.push(message);
  }

}
