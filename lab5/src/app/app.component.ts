import { Component } from '@angular/core';

import { ImageService } from './image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lab4';

  isLogin = true;

  images: any;

  constructor(private imageService: ImageService) {}

  onLogin() {
    this.isLogin = false;

    this.imageService.getAllImages().subscribe((items) => {
      this.images = items;
    });
  }
}
