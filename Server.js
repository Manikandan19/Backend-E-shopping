var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/E-shop";
var express = require('express');
var app = express();


/*In this Method is using for overcome cross-origin problem */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



/*In this Method is using to provide available products details from database */

app.get('/availableProducts', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shop");
        dbo.collection("Products").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
});



/*In this Method is using for define a running server*/
app.listen(8080, function () {
    console.log("server running successfully in port:8080....")
});