/**
 * Created by anmol on 23/7/17.
 */

const router=require('express').Router();
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=>{

    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        db.collection('AllEvents').deleteMany({},function (err,result) {
            res.send("Deleted");
        });
        db.close();
    })
});

module.exports=router;