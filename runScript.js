const { exec } = require("child_process");

function convertSong(file, callback) {
  let a = "./";
  file = a.concat(file);

  var fs = require("fs");
  var mm = require("musicmetadata");

  // create a new parser from a node ReadStream
  var parser = mm(fs.createReadStream(file), function (err, metadata) {
    if (err) throw err;
    // console.log(metadata);
    return callback(metadata);
    // runSrcipt("sox ./data/grenzenlos.mp3 ./data/grenzenlos.wav");
  });
}
function runSrcipt(song) {
  exec(song, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
module.exports = { runSrcipt, convertSong };
