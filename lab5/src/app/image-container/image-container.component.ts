import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppContentService } from '../app-content.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css'],
})
export class ImageContainerComponent implements OnInit {
  constructor(
    private appContentService: AppContentService,
    private http: HttpClient
  ) {}

  text: string = '';

  ngOnInit(): void {
    this.text = `Click me for a welcome message!`;
    this.http.get<any>(`/users/categories`).subscribe(
      (data) => {
        this.appContentService.topics = data.categories;
        console.log(data.categories);
      },
      (err) => {
        console.error('Did not work', err);
      }
    );
  }

  hasContent = (): boolean => this.appContentService.images.length > 0;

  isLogin = (): boolean => this.appContentService.isLogin;

  getImages = () => this.appContentService.images;

  getTopics = () => this.appContentService.topics;

  print = () =>
    (this.text = `Hello ${this.appContentService.userId}! How are you today? Welcome to Image finder! Let's explore!`);
}
