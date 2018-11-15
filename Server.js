var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/E-shop";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});



/*In this Method is using to set User Register details  */
app.post('/register', bodyParser.json(), function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shop");
        var myobj = req.body;
        dbo.collection("customers").find({ "email": myobj.email }).toArray(function (err, result) {
            if (err) throw err;
            data = result;
            console.log(result);

            if (result == '') {
                dbo.collection("customers").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
                res.send("Data inserted successfully");
            }
            else if (result[0].email == myobj.email) {
                db.close();
                res.send("Data Already Exist...")
            }
        });
    });

});



/*In this Method is using for define a running server....*/
app.listen(8080, function () {
    console.log("server running successfully in port:8080....")
});
