import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}
  formID: any = document.getElementById('form-userid');
  userID: any = document.getElementById('userid');
  submit: any = document.getElementById('submit');
  navBar: any = document.getElementById('navigation');
  images: any = document.getElementById('images');
  navLinks: any = document.getElementsByClassName('nav-link');
  searchQuery: any = document.getElementById('search-bar');
  searchSubmit: any = document.getElementById('search-submit');
  catergory: string | undefined;
  userName: string | undefined;

  getAllImages() {
    const url = `http://localhost:3000/users/mmm/images`;
    return this.httpClient.get(url);
  }

  getImagesByCategory(category: string) {
    const url = `http://localhost:3000/users/mmm/images/${category}`;
    return this.httpClient.get(url);
  }
}

// submit.addEventListener('click', (e) => {
//   e.preventDefault();
//   if (userID.value == '') {
//     alert('Please enter Username');
//   }
//   if (userID.value != '') {
//     userName = userID.value;
//     formID.style.display = 'none';
//     for (var i = 0; i < navLinks.length; i++) {
//       navLinks[i].classList.remove('disabled');
//     }
//     document.getElementById('text').innerHTML = 'yes';
//     welcome(userName);
//   }
// });

// function welcome(userName) {
//   var txt;
//   if (userName == null || userName == '') {
//     txt = ' ';
//   } else {
//     txt =
//       'Hello ' +
//       userName +
//       "! How are you today? Welcome to the Image finder! We will help you to find out the image you want.Let's explore!";
//   }
//   document.getElementById('text').innerHTML = txt;
// }

// for (var i = 0; i < navLinks.length; i++) {
//   navLinks[i].addEventListener('click', (e) => {
//     images.textContent = '';
//     catergory = e.target.innerHTML;
//     fetch(`http://localhost:3000/users/${userName}/images/${catergory}`)
//       .then((response) => response.json())
//       .then((data) => {
//         for (var j = 0; j < data.response.results.length; j++) {
//           var img = document.createElement('img');
//           img.src = data.response.results[j].urls.small;
//           img.alt = data.response.results[j].alt_description;
//           img.classList.add('image');
//           images.appendChild(img);
//         }
//       });
//   });
// }

// searchSubmit.addEventListener('click', (e) => {
//   e.preventDefault();
//   console.log(searchQuery.value);
//   if (searchQuery.value != '') {
//     images.textContent = '';
//     const data = { catergory: searchQuery.value };
//     fetch(`http://localhost:3000/users/${userName}/images`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Success:', data);
//         for (var j = 0; j < data.response.results.length; j++) {
//           var img = document.createElement('img');
//           img.src = data.response.results[j].urls.small;
//           img.alt = data.response.results[j].alt_description;
//           img.classList.add('image');
//           images.appendChild(img);
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//     var div = document.getElementById('text');
//     div.parentNode.removeChild(div);
//   } else {
//     alert('Please Enter a Topic to Search');
//   }
// });

// function my$(id) {
//   return document.getElementById(id);
// }

// function getPage(e) {
//   var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
//   var pageY = e.pageY || e.clientY + getScroll().scrollTop;
//   return {
//     pageX: pageX,
//     pageY: pageY,
//   };
// }

// function popbox() {
//   box.style.display = 'flex';
//   hidden.style.display = 'block';
// }
