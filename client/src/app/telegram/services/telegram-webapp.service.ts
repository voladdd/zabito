import { Injectable } from '@angular/core';
import { IWebApp } from '../types/webapp.interface';

@Injectable({ providedIn: 'root' })
export class TelegramWebAppService {
  constructor() {
    this.tg.ready();
  }

  tg: IWebApp = (window as any).Telegram.WebApp;

  getInitData() {
    return this.tg.initData;
  }
}
