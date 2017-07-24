/**
 * Created by anmol on 23/7/17.
 */

const router=require('express').Router();
const MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=>{
   MongoClient.connect(url,(err,db)=>{
       let oldObj={Sql:req.body.id,name:req.body.name,date:req.body.date,time:req.body.time}
       let newObj={$set : {imgUrl:req.body.imageUrl,name:req.body.name1,date:req.body.date1,time:req.body.time1,desc:req.body.desc1}}
       db.collection('AllEvents').updateOne(oldObj,newObj,function (err,result) {
           console.log(result);
           res.send({success:true});
       });
       db.close();
   });
});

module.exports=router;