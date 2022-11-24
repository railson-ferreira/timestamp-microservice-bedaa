// index.js
// where your node app starts


// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname.replace("api","") + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




app.get("/api/:date?", function (req, res) {
  const dateStr = req.params.date;
  if(!dateStr){
    const now = new Date();
    res.json({unix: now.getTime(), utc: now.toUTCString()})
  }else{
    const date =  Number(dateStr)?new Date(Number(dateStr)): new Date(dateStr);
    if(isNaN(date.getTime())){
      res.json({error: "Invalid Date"})
    }else{
      res.json({unix: date.getTime(), utc: date.toUTCString()})
    }
  }
});




module.exports = app