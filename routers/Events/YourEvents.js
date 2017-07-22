/**
 * Created by anmol on 22/7/17.
 */

const router=require('express').Router();
const sqldb=require('../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        db.collection('AllEvents').find({Sql:req.body.id}).toArray(function (err,result) {
            if (err) throw err;
            res.send(result)
        });
        db.close();
    }) ;
});

module.exports=router;