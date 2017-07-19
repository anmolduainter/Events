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


app.post('/YourEvents',function (req,res) {

    db.collection('AllEvents').find({Sql:req.body.id}).toArray(function (err,result) {

        if (err) throw err;

        res.send(result)

    })

});



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


app.post('/AddEvent',(req,res)=>{

    let id=(req.body.id.toString());
    let title=(req.body.title);
    let imgURL=req.body.imageUrl;
        let date=req.body.date.toString()
    let time=req.body.time;
        let desc=req.body.desc;

        console.log(id)
        console.log(title)
      console.log(imgURL)
    console.log(date)
    console.log(time)
    console.log(desc)


    db.collection('AllEvents').insertOne(

        { Sql:id, imgUrl:imgURL, name: title,
            date:date,time:time,desc:desc , going:0 , interested:0 , like:0 , notlike:0 }


    )

        .then(function(result) {
            console.log(result);
            res.send({success:true});
        })



});



app.post('/register',(req,res)=>{

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

app.post('/registerCheck',(req,res)=>{

   sqldb.login.findAll({where:{username:req.body.username}}).then(function(result){

       if (typeof(result[0])=='undefined'){
           res.send({success:false})
       }
       else {
           res.send({success:true});
       }

   })

});

app.post('/login',(req,res)=>{

    sqldb.login.findAll({where:{email:req.body.email,password:req.body.password}}).then(function (result) {

        if (typeof(result[0])=='undefined'){
            res.send({success:false})
        }
        else {
            console.log(result[0].id);
            console.log(result[0].email)
            res.send({success:true,id:result[0].id,email:result[0].email});
        }
    });

});