/**
 * Created by anmol on 17/7/17.
 */

let express=require('express');
let bp=require('body-parser');
let db;
let app=express();

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

app.use('/',express.static(__dirname + "/public_static"));


let MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, database) {

    console.log("Connected correctly to server");

    db=database;

   // getCur(db)

    app.listen(3000,function () {

        console.log("Connected to server");

    })


   // database.close();
});


app.post('/save',function (req,res) {

    db.collection('invent').insertOne({item:req.body.name})
        .then(function(result) {

              res.send(result);

        });

});

app.get('/save',function (req,res) {

    db.collection('invent').find({}).toArray(function (err,result) {
        if (err) throw err

        res.send(result);

    })

});

app.post('/delete',function (req,res) {

    db.collection('invent').deleteOne({item:null},function (err,result) {

        res.send("Deleted");

    })

})

function getCur(db){

    let cursor=db.collection('inventory').find({status:"D"}).toArray(function (err,result) {
        if (err) throw err;
        console.log(result[0].item)
    })

   // console.log(cursor)

}


