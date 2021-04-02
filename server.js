const express = require("express");
const unsplash = require("unsplash-js");
const path = require("path");
const request = require("request");
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const port = 3000;
var allCatergories = [];
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

app.get("/users/:userid/images/:catergory", async (req, res) => {
  console.log(req.params);
  const collection = client.db("DBL5").collection("Lab5Data");
  const catergory = req.params.catergory;
  const document = await collection.findOne({ catergory: catergory });

  var imagesToFront = [];
  document.images.forEach((img) => {
    const number = Math.floor(Math.random() * 108);
    imagesToFront.push(document.images[number]);
  });
  res.status(200).json({ images: imagesToFront.slice(0, 12) });
});

app.get("/users/categories", (req, res) => {
  const collection = client.db("DBL5").collection("Lab5Data");

  const cursor = collection.find();
  cursor.toArray().then((data) => {
    allCatergories = [];
    for (var i = 0; i < data.length; i++) {
      allCatergories.push(data[i].catergory);
    }
    res.status(203).json({ categories: allCatergories });
  });
});

app.post("/users/:userid/images", (req, res) => {
  const collection = client.db("DBL5").collection("Lab5Data");
  const catergory = req.body.catergory;
  collection.findOne({ catergory: catergory}, function(err, result) {
    if (err) {console.log("Could not post")};
    if (result) {console.log("Category already exists!");}
    else {
      createImages(req.body.catergory, res);
    }
  })
});

app.put("/users/:userid/images", async (req, res) => {
  const collection = client.db("DBL5").collection("Lab5Data");
  const old_catergory = req.body.old_catergory;
  const new_catergory = req.body.new_catergory;

  await collection.deleteOne({ catergory: old_catergory });
  createImages(new_catergory, res);
});

app.delete("/users/:userid/images/:catergory", async (req, res) => {
  const collection = client.db("DBL5").collection("Lab5Data");
  const catergory = req.params.catergory;

  await collection.deleteOne({ catergory: catergory });
  
  res.status(203).json({ msg: `You Have Deleted the ${catergory} catergory` });
});

const createImages = async (catergory, res) => {
  var allImages = [];
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
        uri: `https://api.pexels.com/v1/search?query=${catergory}&orientation=landscape&size=small&per_page=39`,
        method: "GET",
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var results = JSON.parse(body);
          resolve(results.photos);
        }
        reject(error);
      }
    );
  });

  const values = await Promise.all([
    unsplashPromise,
    pixabayPromise,
    pexelsPromise,
  ]);
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
  const collection = client.db("DBL5").collection("Lab5Data");

  await collection.insertMany([{ catergory: catergory, images: allImages }]);

  const cursor = collection.find();
  cursor.toArray().then((data) => {
    allCatergories = [];
    for (var i = 0; i < data.length; i++) {
      allCatergories.push(data[i].catergory);
    }
    res.status(203).json({ categories: allCatergories });
  });
};

app.listen(port, () => {
  console.log("Listening on *:3000");
});
