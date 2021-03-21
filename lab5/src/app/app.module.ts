import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginBoxComponent } from './login-box/login-box.component';
import { ImageContainerComponent } from './image-container/image-container.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginBoxComponent, ImageContainerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
