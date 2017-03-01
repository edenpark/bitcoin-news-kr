const express = require('express');
const path = require('path');
const app = express();
const MetaInspector = require('node-metainspector');




app.use(express.static('./build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', '200.html'));
});


app.get('/scrape', function (req, res) {
    let url = 'https://news.bitcoin.com/happened-to-bitcoin-in-china-2017/';
    const client = new MetaInspector(url, { timeout: 50000});

    client.on("fetch", function(){
        console.log("Description: " + client.description);

        console.log("Title: " + client.title);
    });

    client.on("error", function(err){
        console.log(err);
    });

    client.fetch();
});


app.listen(9000);
