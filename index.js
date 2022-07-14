const http = require("http");
const url = require("url");
const fs = require("fs");
const { MongoClient } = require("mongodb");

// finding in database
async function findListings(client, searchObject) {
  const result = await client
    .db("testing")
    .collection("test")
    .findOne(searchObject);
  if (result) {
    console.log(`found a listing:${result}`);
  } else {
    console.log(`no such listing found`);
  }
}
async function getAllQuestions(client) {
  const cursor = await client
    .db("testing")
    .collection("test")
    .find({
      _id: { $gte: 0 },
    });
  const result = await cursor.toArray();
  return result;
}
async function main(res) {
  const uri =
    "mongodb+srv://pragati:<password>@cluster0.6aubh.mongodb.net?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    // console.log(client);
    await client.connect();
    console.log("client is connected");
    let result = await getAllQuestions(client);
    console.log(`result is `);
    result = JSON.stringify(result);
    res.end(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("this is overview");
  } else if (pathName === "/problems") {
    main(res);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end(`<h1>Page not found</h1>`);
  }
});

server.listen(8000, `127.0.0.1`, () => {
  console.log("listening to requests on port 8000");
});
