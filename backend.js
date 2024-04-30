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
app.get("/:type", async (req, res) => {
  try{
    const parkType = String(req.params.type);
    console.log("Parks to find :", parkType);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"type": parkType};
    const results = await db
    .collection("HikersPlanner")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: 'An internal server error occurred' });
  }
});

app.get("/gethikes/:id", async (req, res) => {
  try{
    const id = Number(req.params.id);
    console.log("Parks to find :", id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": id};
    const options = {projection: { hikes: 1, _id:0}};
    const results = await db
    .collection("HikersPlanner")
    .find(query, options)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: 'An internal server error occurred' });
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
