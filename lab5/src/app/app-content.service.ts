import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppContentService {
  isLogin: boolean = false;
  userId: string = '';
  images: Array<any> = [];
  topics: Array<string> = [];

  addToNav(topic: string) {
    this.topics.push(topic);
  }

  constructor() {}
}
