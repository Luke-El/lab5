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

  delete: string = '';

  replaceOld: string = '';

  replaceNew: string = '';

  updateSearch = (e: any) => {
    this.search = e.target.value;
  };

  updateDelete = (e: any) => {
    this.delete = e.target.value;
    console.log(this.delete);
  };

  updateReplaceOld = (e: any) => {
    this.replaceOld = e.target.value;
    console.log(this.replaceOld);
  };

  updateReplaceNew = (e: any) => {
    this.replaceNew = e.target.value;
    console.log(this.replaceNew);
  };

  refresh(): void {
    window.location.reload();
  };

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


  
  adddefault() {
    let defa: string[] = ['tiger', 'cat', 'dog'];
    for(var index in defa){ 
      console.log(defa[index]);
      const userId = this.appContentService.userId;
      this.http
        .post<any>(`/users/${userId}/images`, { catergory: defa[index] })
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
  }

  getTopics = () => this.appContentService.topics;

  logWord() {
    console.log(this.search);
  }

  deleteData() {
    console.log(this.delete);
    const userId = this.appContentService.userId;
    const catergory = this.delete;
    const index: number = this.appContentService.topics.indexOf(this.delete, 0);
    this.http
      .delete<any>(`/users/${userId}/images/${catergory}`)
      .subscribe(
        (data) => {
          console.log(this.delete);
          if (index > -1) {
            this.appContentService.topics.splice(index, 1);
          }
          this.appContentService.topics = [... this.appContentService.topics];
          console.log(this.appContentService.topics);
        },
        (err) => {
          console.error('Could not delete', err);
        }
      );
  }

  replaceData() {
    console.log(this.replaceOld);
    const userId = this.appContentService.userId;
    this.http
      .put<any>(`/users/${userId}/images`, { old_catergory: this.replaceOld, new_catergory:this.replaceNew})
      .subscribe(
        (data) => {
          this.appContentService.topics = data.categories;
          console.log(data.categories);
        },
        (err) => {
          console.error('Could not replace', err);
        }
      );
  }
}
