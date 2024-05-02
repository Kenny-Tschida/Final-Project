var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "FinalProject";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listParks", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("HikersPlanner")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/gethikes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log("Parks to find :", id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "id": id };
    const options = { projection: { hikes: 1, _id: 0 } };
    const results = await db
      .collection("HikersPlanner")
      .findOne(query, options)
    console.log(results);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: 'An internal server error occurred' });
  }
});


app.delete("/deletePark", async (req, res) => {
  try {
    await client.connect();
    const values = Object.values(req.body);
    const title = values[0];
    console.log("Item to delete :", title);
    const query = { "name": title };
    const results = await db.collection("HikersPlanner").deleteOne(query);
    res.status(200);
    res.send(results);

  } catch (error) {
    console.error("Error deleting park:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
})
app.put("/update/:name", async (req, res) => {
  try {
    const itemName = req.params.name;
    await client.connect();
    const query1 = { name: itemName };
    const updateHike = { $push: { hikes: req.body.hike } };
    const results = await db
      .collection("HikersPlanner")
      .findOneAndUpdate(query1, updateHike, { returnDocument: "after" });
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("Error deleting park:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
app.post("/addPark", async (req, res) => {
  try {
    await client.connect();
    const values = Object.values(req.body);
    const id = values[0]; // id
    const name = values[1]; // title
    const location = values[2]; // price
    const type = values[3]; // description
    const image = values[4]; //category
    const hikes = []; // rating
    const newDocument = {
      id: id,
      name: name,
      location: location,
      type: type,
      image: image,
      hikes: hikes,
    };
    const results = await db
      .collection("HikersPlanner")
      .insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: error.message || "An internal server error occurred" });
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});



app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
