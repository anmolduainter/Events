/**
 * Created by anmol on 3/8/17.
 */

const router=require('express').Router();
const sqldb=require('../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;

let url = 'mongodb://localhost:27017/myproject';


router.post('/',(req,res)=>{


    MongoClient.connect(url,(err,db)=>{

        let name=req.body.name.toString();
        let date=req.body.date.toString();
        let time=req.body.time.toString();

        console.log(name);
        console.log(date);
        console.log(time);


        db.collection('AllEvents').find({name: name,date: date, time: time}).toArray(function (err,result) {

            let query={
                events_id:result[0]._id.toString()
            };


            sqldb.leader.findOne({where:query}).then(function (result) {


                if (result==undefined){

                }

                else{

                    let dislike=+(result.disLikes)+1;

                    console.log(result.disLikes);

                    let id=result.events_id;

                    sqldb.leader.update({disLikes:dislike},{where:{events_id:id}}).then(function () {

                        res.send({success:true});

                    });


                }

            })



        })


    })

});




module.exports=router;
