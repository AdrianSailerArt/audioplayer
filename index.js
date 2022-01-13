// index.js

/**
 * Required External Modules
 */
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8000;

//const path = require("path");
const cmdScript = require("./runScript");
var bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const sox = require("./runScript.js");
var multer = require("multer");
const { setTimeout } = require("timers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    // or
    // uuid, or fieldname
    cb(null, originalname);
  },
});
var upload = multer({ storage });
/**
 * App Variables
 */

/**
 *  App Configuration
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("SOCKET", socket.id);
  socket.on("playSong", (msg) => {
    console.log(msg);
    let rawdata = fs.readFileSync("data/trigger.json");
    let db = JSON.parse(rawdata);
    const found = db.trigger.find((element) => element.position == msg);
    if (found) {
      sox.runSrcipt("play " + found.path);
    }
    io.emit("playSong", msg);
  });
});
/**
 * Routes Definitions
 *
 *
 *
 */

app.get("/getSongs", (req, res) => {
  let rawdata = fs.readFileSync("data/db.json");
  let db = JSON.parse(rawdata);

  res.json(db);
});

app.get("/getTrigger", (req, res) => {
  let rawdata = fs.readFileSync("data/trigger.json");
  let db = JSON.parse(rawdata);

  res.json(db);
});

app.post("/play", (req, res) => {
  sox.runSrcipt("killall play");
  setTimeout(() => {
    sox.runSrcipt("play " + req.body.path);
  }, 900);
  res.json(req.body);
});
app.get("/stop", (req, res) => {
  console.log(req.body);
  //stop playing the song -- kill terminal process
  sox.runSrcipt("killall play");
});

app.post("/upload", upload.single("song"), (req, res, next) => {
  let rawdata = fs.readFileSync("data/db.json");
  let db = JSON.parse(rawdata);

  const file = req.file.path;

  sox.convertSong(file, (callback) => {
    let metaInfo = {};
    metaInfo = callback;
    let newSong = {
      title: metaInfo.title || "New Title",
      path: "./data/" + req.file.originalname,
      artist: metaInfo.artist || "New Artist",
      album: metaInfo.album || "New Album ",
      id: db.songs.length,
    };

    db.songs.push(newSong);
    res.json(db);
    let data = JSON.stringify(db);
    fs.writeFileSync("data/db.json", data);
  });

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.post("/addTrigger", (req, res, next) => {
  let rawdata = fs.readFileSync("data/trigger.json");
  let db = JSON.parse(rawdata);
  console.log(req.body);

  db.trigger.push(req.body);
  res.json(db);
  let data = JSON.stringify(db);
  fs.writeFileSync("data/trigger.json", data);
});
/**
 * Server Activation
 */
http.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
