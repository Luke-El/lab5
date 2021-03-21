import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppContentService } from '../app-content.service';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css'],
})
export class ImageContainerComponent implements OnInit {
  constructor(private appContentService: AppContentService) {}

  text: string = '';

  ngOnInit(): void {
    this.text = `Click me for a welcome message!`;
  }

  hasContent = (): boolean => this.appContentService.images.length > 0;

  isLogin = (): boolean => this.appContentService.isLogin;

  getImages = () => this.appContentService.images;

  print = () => this.text = `Hello ${this.appContentService.userId}! How are you today? Welcome to Image finder! Let's explore!`;
}
