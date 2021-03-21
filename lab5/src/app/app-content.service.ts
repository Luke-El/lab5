import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppContentService {
  isLogin: boolean = false;
  userId: string = '';
  images: Array<any> = [];

  constructor() {}
}
