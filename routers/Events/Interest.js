/**
 * Created by anmol on 25/7/17.
 */

const router=require('express').Router();
const sqlDb=require('../../DataBase/sqlDatabase');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=>{

    MongoClient.connect(url,(err,db)=>{

        if (err) throw err;

        let name=req.body.name.toString();
        let date=req.body.date.toString();
        let time=req.body.time.toString();

        let  oldValues={name:name,date:date,time:time};;
        let newValues;

        db.collection('AllEvents').find({name:name,date:date,time:time}).toArray((err,result)=>{
            if (err) throw err;

            console.log(result[0].interested);
            let Interest=+(result[0].interested)+1;
            console.log(parseInt(Interest));
            console.log(result);
            console.log('Interest : '+Interest);

             newValues={interested:Interest};

             console.log(newValues);
             console.log({_id:result[0]._id.toString()});

             let query={events_id:result[0]._id.toString()};
             let eventId=result[0]._id.toString()

             sqlDb.leader.findAll({where:query}).then(function (result) {

                 if (result.length==0){

                     sqlDb.leader.create({
                         events_id:eventId,
                         interested:1
                     }).then(function (result1) {
                         console.log(result1)
                     })

                 }
                 else{

                     let interestedNo=result[0].interested;

                     sqlDb.leader.update({
                         interested:+(interestedNo)+1
                     },{where:{events_id:eventId}}).then(function (result1) {
                         console.log(result1)
                     })


                 }


             })




        });


        db.close();

    });

});

module.exports=router;