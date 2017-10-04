
const router=require('express').Router();
const sqldb=require('../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=>{

    console.log("Events Called ---------------------------->>>>>>>>>>>>>")

    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        let usrId=req.user[0].dataValues.id;
        console.log("User iD: " + usrId);
        db.collection('AllEvents').find({Sql:usrId.toString()}).toArray(function (err,result) {
            if (err) throw err;
             console.log(result.length)
            res.send({result:result,count:result.length})
        });
        db.close();
    }) ;
});

module.exports=router;