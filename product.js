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


/*In this Method is using to  register products details to database */
app.post('/products/registerDetails', bodyParser.json(), function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("E-shop");
        var myobj = req.body;
        dbo.collection("products").find({ "productID": myobj.productID }).toArray(function (err, result) {
            if (err) throw err;
            if (result == '') {
                dbo.collection("products").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
                res.send("ProductDetails inserted successfully");
            }
            else if (result[0].productID == myobj.productID) {
                db.close();
                res.send("ProductDetails Already Exist...")
            }
        });
    });

});



/*In this Method is using for define a running server....*/
app.listen(8018, function () {
    console.log("server running successfully in port:8018....")
});
