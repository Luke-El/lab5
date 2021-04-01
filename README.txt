Completing this lab was very insightful. In terms of the backend not only did we connect to our MongoDB database,
but we also pulled over 100 images from 3 different photo APIs and formatted them to fit our datbase structure. The first database we 
used was Unsplash, because we had previously used it, implementing is was not difficult. The other two APIs we used were
Pexels and Pixabay which had a similar structure to the API call made with Unsplash. The data we collected from the APIs were the image 
URLs and the alternate descriptions. The hardest part of the lab was getting the array that had all of the images to update at the right time. 
When we first wrote our function to pull pictures from the APIs we were only getting photos from 1 of our APIs despite the fact that when we used 
console.log() to view the array after each API was called the array was being populated. To fix this issue we used async on the function and used embedded functions 
to create promises for each array. Once these arrays were made we used Promise.all to concat the images to our allImages array. Once we were able to get the data, we 
needed a way for users to specify what data they wanted. To do this we made a POST request that called the previously mentioned function with a category
that the user inputted with the searchbar on the front end. Once the user put in a keyword, the POST endpoint on the backend called the createImages
function and pushed the images to the database. After the data was in the database we needed a way to show to users the categories that were in the database,
so we created a GET request that got all of the categories from the database and displayed them in the navigation bar. This addition made it so every time
the database was update so was the navigation bar. The next thing we had to do was get the images to display on the front end. To do this we used another GET
request. This GET request connected to the database and utilized Math.random() to pick 12 random images from the 108 images the were collected to display 
to the front end. We also implemented a feature using DELETE. With DELETE users could delete all of the data for a certain category from the database if they
decided they are no longer interested in the topic.DELETE connected to the database and found the data associated with the word the user selected and deleted of the data for it. 
We also used PUT. With PUT we enabled users to update or change categories the a currently stored in the database. PUT deletes that data for whatever topic the user selected to 
change and replaces it with the new category they want. In terms of the front end, we utilized the same components, (navbar, image-container, and login-box) and service (app.component) 
but made some changes. We made an additional navigation bar in the image-container component because the initial navbar was getting too cluttered and could not fit all of the new features 
and categories. The new navigation bar utilized the GET request onInit() to get all of the categories from the database and push them to an array made in the service. The array was then 
used by the image-container component and the navbar component. The image-container also used  the GET request to display images to the user. The navbar component used the majority of 
our endpoints. The POST request was attached to a search bar that took in a topic from the user which then went to the backend and called the API to gathered the data. We used a drop 
down menu that used the previously mentioned array to allow users to selected a topic currently in the database and call the DELETE endpoint. Finally, we used a combination of the 
dropdown menu and searchbar to implement PUT. For PUT we used the topics array to selected what needed to be deleted and a searchbar to update the topic with the new data in the database. 
Overall, while in the intial stages of the lab we ran into a few bugs, this lab helped us understand how to gather data from multiple APIs and format it in away that is useful to us and
easy to deploy into a database.

To deploy this lab cd into the lab5 folder and run node server. Then cd into the second lab5 folder and run ng build --watch.

Luke: I worked on both frontend and backend development. In terms of the backend, I made the GET request that got the categories from the database and the POST request that posted the 
images data to the database. I also wrote the createImages() function that was used to collect and format the image data gathered from the APIs. To implement the createImages() function,
I first connected to each of the APIs and used console.log() to make sure I was getting the data. Next I converted all of the data to promises because I ran into a bug where all of the 
images were not being pushed into the array. I believed this is because I was using asynchronus programming. Once the promises were made I decoded the promises and put the data in the database
using the POST request. I then used the GET request to search the database for the category key and get the value to display to the frontend. For the frontend, I updated the component 
and service with an updated system that better suited our new features. I  used the service to my advantage when implementing the GET request that collected the categories from the database 
and displayed them to the user using a fucntion in typescript to puth them into an array then used an *ngFor() loop in CSS and HTML to display the infromation to the users. I also created a
searchbar that got the topic that the user typed in and sent it to the typescript which sent it to the backend using POST and collected the images using the createImages() function.