/**
 * Created by anmol on 17/7/17.
 */

let express=require('express');
let bp=require('body-parser');
let sqldb=require('./sqlDatabase');
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


// app.post('/save',function (req,res) {
//
//     db.collection('invent').insertOne({item:req.body.name})
//         .then(function(result) {
//
//               res.send(result);
//
//         });
//
// });
//
app.get('/AllEvents',function (req,res) {

    let arr=[];

    db.collection('AllEvents').find({}).toArray(function (err,result) {
        if (err) throw err;

        //sqldb.login.findAll()

        for(i of result){

            sqldb.login.findAll({where:{id:i.Sql}}).then(function (result) {

                arr.push(new objc(result[0].username,result[0].phone));
                console.log(arr);

            })

        }

        // console.log(result[0].Sql);
        //
         let done=false;
         let idInterval= setInterval(function () {

           if (done){
               clearInterval(idInterval);
           }

            else if (arr.length==result.length){

                res.send({result,arr});
                done=true;
            }
            else{

                clearInterval(idInterval);

            }

        },1000);

    })

});



function objc(username,phone){

    this.username=username;
    this.phone=phone;

}


app.post('/delete',function (req,res) {

    db.collection('AllEvents').deleteMany({},function (err,result) {

        res.send("Deleted");

    })

})
//
// function getCur(db){
//
//     let cursor=db.collection('inventory').find({status:"D"}).toArray(function (err,result) {
//         if (err) throw err;
//         console.log(result[0].item)
//     })
//
//    // console.log(cursor)
//
// }


app.get('/mongotrial',(req,res)=>{


    db.collection('AllEvents').insertMany([
        // MongoDB adds the _id field with an ObjectId if _id is not present
        { Sql: "1", imgUrl:"https://www.w3schools.com/css/trolltunga.jpg", name: "Dance",
            date:"22-12-2017",time:"10AM - 11PM",desc:"Hello, with that spelling, was used in publications in the US as early as the 18 October 1826 edition of the Norwich Courier of Norwich, Connecticut.[1] Another early use was an 1833 American book called The Sketches and Eccentricities of Col. David Crockett, of West Tennessee,[2] which was reprinted that same year in The London Literary Gazette."
            , going:0 , interested:0 , like:0 , notlike:0 },

        { Sql:"2", imgUrl:"https://www.w3schools.com/css/trolltunga.jpg", name: "Dj babu",
            date:"21-11-2017",time:"10AM - 11PM",desc:"Hello, with that spelling, was used in publications in the US as early as the 18 October 1826 edition of the Norwich Courier of Norwich, Connecticut.[1] Another early use was an 1833 American book called The Sketches and Eccentricities of Col. David Crockett, of West Tennessee,[2] which was reprinted that same year in The London Literary Gazette."
            , going:0 , interested:0 , like:0 , notlike:0 },

        { Sql:"1", imgUrl:"https://www.w3schools.com/css/trolltunga.jpg", name: "SingSong",
            date:"12-10-2017",time:"10AM - 11PM",desc:"Hello, with that spelling, was used in publications in the US as early as the 18 October 1826 edition of the Norwich Courier of Norwich, Connecticut.[1] Another early use was an 1833 American book called The Sketches and Eccentricities of Col. David Crockett, of West Tennessee,[2] which was reprinted that same year in The London Literary Gazette."
            , going:0 , interested:0 , like:0 , notlike:0 },

        { Sql:"3", imgUrl:"https://www.w3schools.com/css/trolltunga.jpg", name: "kels",
            date:"25-09-2017",time:"10AM - 11PM",desc:"Hello, with that spelling, was used in publications in the US as early as the 18 October 1826 edition of the Norwich Courier of Norwich, Connecticut.[1] Another early use was an 1833 American book called The Sketches and Eccentricities of Col. David Crockett, of West Tennessee,[2] which was reprinted that same year in The London Literary Gazette."
            , going:0 , interested:0 , like:0 , notlike:0 },

        { Sql:"1", imgUrl:"https://www.w3schools.com/css/trolltunga.jpg", name: "guitar",
            date:"28-09-2017",time:"10AM - 11PM",desc:"Hello, with that spelling, was used in publications in the US as early as the 18 October 1826 edition of the Norwich Courier of Norwich, Connecticut.[1] Another early use was an 1833 American book called The Sketches and Eccentricities of Col. David Crockett, of West Tennessee,[2] which was reprinted that same year in The London Literary Gazette."
            , going:0 , interested:0 , like:0 , notlike:0 }



    ])

        .then(function(result) {
            console.log(result);
            res.send(result);
        })



});



app.post('/save',(req,res)=>{

    sqldb.login.create({username : req.body.username,
                        password : req.body.password,
                        email : req.body.email,
                        phone: req.body.phone
                    }).then(function (data) {

                        res.send(data);
        }).catch(function (err) {

          throw err;

       })
});

app.post('/login',(req,res)=>{

    sqldb.login.findAll({where:{email:req.body.email,password:req.body.password}}).then(function (result) {

        if (typeof(result[0])=='undefined'){
            res.send({success:false})
        }
        else {
            res.send({success:true});
        }
    });

});