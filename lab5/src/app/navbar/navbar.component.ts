import { Component, OnInit } from '@angular/core';
import { AppContentService } from '../app-content.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private appContentService: AppContentService,
    private http: HttpClient
  ) {}

  isLogin = (): boolean => this.appContentService.isLogin;

  ngOnInit(): void {}

  search: string = '';

  updateSearch = (e: any) => {
    this.search = e.target.value;
  };

  refresh(): void {
    window.location.reload();
  }

  getImages(topic: any) {
    console.log(topic.target.innerText);
    const userId = this.appContentService.userId;
    const catergory = topic.target.innerText;
    this.http.get<any>(`/users/${userId}/images/${catergory}`).subscribe(
      (data) => {
        this.appContentService.images = data.response.results.map(
          (result: any) => {
            return { url: result.urls.small, alt: result.alt_description };
          }
        );
      },
      (err) => {
        console.error('Did not work', err);
      }
    );
  }

  searchImages(topic: any) {
    console.log(this.search);
    const userId = this.appContentService.userId;
    this.http
      .post<any>(`/users/${userId}/images`, { catergory: this.search })
      .subscribe(
        (data) => {
          this.appContentService.images = data.response.results.map(
            (result: any) => {
              return { url: result.urls.small, alt: result.alt_description };
            }
          );
        },
        (err) => {
          console.error('Did not work', err);
        }
      );
  }

  addData() {
    console.log(this.search);
    const userId = this.appContentService.userId;
    this.http
      .post<any>(`/users/${userId}/images`, { catergory: this.search })
      .subscribe(
        (data) => {
          this.appContentService.topics = data.categories;
          console.log(data.categories);
        },
        (err) => {
          console.error('Did not work', err);
        }
      );
  }
  getTopics = () => this.appContentService.topics;

}
