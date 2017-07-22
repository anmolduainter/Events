/**
 * Created by anmol on 23/7/17.
 */

const router=require('express').Router();
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=>{
   MongoClient.connect(url,(err,db)=>{
       db.collection('AllEvents').deleteOne({Sql:req.body.id,name:req.body.name,date:req.body.date,time:req.body.time},function (err,result) {
           res.send({success:true});
       });
       db.close();
   })
});

module.exports=router;