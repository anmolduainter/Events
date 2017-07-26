/**
 * Created by anmol on 25/7/17.
 */

const router=require('express').Router();
const sqlDb=require('../../DataBase/sqlDatabase');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=> {

    // console.log(req.user);

    MongoClient.connect(url, (err, db) => {

        if (err) throw err;

        let name = req.body.name.toString();
        let date = req.body.date.toString();
        let time = req.body.time.toString();
        let newValues;

        db.collection('AllEvents').find({name: name, date: date, time: time}).toArray((err, result) => {
            if (err) throw err;


            if (req.user==undefined){

                console.log("not Authorized");
               // res.send("not Authorized");

            }

            else{

                let query={
                   login_id:req.user[0].dataValues.id,
                    events_id:result[0]._id.toString()
                };

                sqlDb.registerEvents.find({where:query}).then(function (result) {

                    console.log(result)

                    if(result==null){


                        sqlDb.registerEvents.create(query).then((result)=>{

                            res.send({success:true});

                        })


                    }
                    else{

                       res.send({success:false});

                    }

                });

            }


        });
        db.close();

    });
});

module.exports=router;
