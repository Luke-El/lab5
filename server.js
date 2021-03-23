const express = require("express");
const unsplash = require("unsplash-js");
const path = require("path");
const request = require("request");
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

var allImages = [];

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://dbUser:APjb6P3m9kb7@lab5.q5ytw.mongodb.net/DBL5?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("DBL5").collection("Lab5Data");
  // perform actions on the collection object
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
    // insertDatatoDB();
  }
});

const insertDocuments = function (db, catergory, list) {
  // Get the documents collection
  const collection = db.collection("Lab5Data");
  // Insert some documents
  // console.log(list);
  collection.insertMany([{ catergory: catergory, images: list }]);
};

app.use(express.static(path.join(__dirname, "./lab5/dist/lab4")));
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// on your node server
const serverApi = unsplash.createApi({
  accessKey: "rvsx6YTx0PUrpxm0-SMEmBvD-OukvHt6ZGOGFiLzIiE",
  fetch: fetch,
  //...other fetch options
});

app.get("/users/:userid/images/:catergory", (req, res) => {
  console.log(req.params);
  insertDatatoDB();
  // serverApi.search
  //   .getPhotos({
  //     query: req.params.catergory,
  //     page: 1,
  //     perPage: 12,
  //     orientation: "landscape",
  //   })
  //   .then((data) => {
  //     res.status(200).json(data);
  //   });
});

app.post("/users/:userid/images", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  var data = req.body;
  serverApi.search
    .getPhotos({
      query: data.catergory,
      page: 1,
      perPage: 12,
      orientation: "landscape",
    })
    .then((data) => {
      res.status(200).json(data);
    });
});

app.put("/users/:userid/images", (req, res) => {
  res.send("Hello world!!!");
  console.log(req);
});

app.delete("/users/:userid/images", (req, res) => {
  res.send("Hello world!!!");
  console.log(req);
});

const storeETL = async (catergory) => {
  // unsplash
  const unsplashPromise = new Promise((resolve, reject) => {
    serverApi.search
      .getPhotos({
        query: catergory,
        page: 1,
        perPage: 30,
        orientation: "landscape",
      })
      .then((data) => {
        resolve(data.response.results);
        // var unsplashList = data.response.results.map((result) => {
        //   return { url: result.urls.small, alt: result.alt_description };
        // });
        // allImages = allImages.concat(unsplashList);
      })
      .catch((error) => {
        reject(error);
      });
  });

  // pixabay
  const pixabayPromise = new Promise((resolve, reject) => {
    var query = `https://pixabay.com/api/?key=20790614-aa78002a80bad5ee077522582&orientation=horizontal&q=${catergory}&per_page=39`;
    request(query, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var results = JSON.parse(body);
        resolve(results.hits);
        // var pixabayList = results.hits.map((result) => {
        //   return { url: result.webformatURL, alt: result.tags };
        // });
        // allImages = allImages.concat(pixabayList);
      }
      reject(error);
    });
  });

  //Pexels
  const pexelsPromise = new Promise((resolve, reject) => {
    request(
      {
        headers: {
          Authorization:
            "563492ad6f9170000100000120658066d2dc4d93825ccfe61f1fb342",
        },
        uri: `https://api.pexels.com/v1/search?query=${catergory}&per_page=39`,
        method: "GET",
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var results = JSON.parse(body);
          resolve(results.photos);
          // var pexelsList = results.photos.map((result) => {
          //   return {
          //     url: result.src.landscape,
          //     alt: result.id.toString(),
          //   };
          // });
          // allImages = allImages.concat(pexelsList);
          // return allImages;
        }
        reject(error);
      }
    );
  });

  Promise.all([unsplashPromise, pixabayPromise, pexelsPromise]).then(
    (values) => {
      //Unsplash Images
      var unsplashList = values[0].map((result) => {
        return { url: result.urls.small, alt: result.alt_description };
      });
      allImages = allImages.concat(unsplashList);

      //Pixabay Images
      var pixabayList = values[1].map((result) => {
        return { url: result.webformatURL, alt: result.tags };
      });
      allImages = allImages.concat(pixabayList);

      //Pexels Images
      var pexelsList = values[2].map((result) => {
        return {
          url: result.src.landscape,
          alt: result.id.toString(),
        };
      });
      allImages = allImages.concat(pexelsList);
      return allImages;
    }
  );
};

const insertDatatoDB = async () => {
  console.log(client.isConnected());
  var topics = [
    "City",
    "Beach",
    "Nature",
    "Animal",
    "Rainforest",
    "Lake",
    "Ocean",
    "Wilderness",
    "Trees",
    "Woods",
    "Pasture",
    "Trail",
    "Mountain",
    "Canyon",
    "Feild",
    "Stream",
    "Sky",
  ];
  storeETL("City");

  //   topics.forEach((topic) => {
  //     imagesForTopic = storeETL(topic);
  //     imagesForTopic.then((data) => {
  //       console.log(data);
  //     });
  //     insertDocuments(client.db("DBL5"), topic, imagesForTopic);
  //     // console.log(imagesForTopic);
  //   });
};

app.listen(port, () => {
  console.log("Listening on *:3000");
});
