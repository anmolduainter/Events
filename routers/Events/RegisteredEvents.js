/**
 * Created by anmol on 26/7/17.
 */


const router=require('express').Router();
const sqldb=require('../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=> {

    let ResultArr=[];

    MongoClient.connect(url, (err, db) => {

        sqldb.registerEvents.findAll({where: {login_id: req.user[0].dataValues.id}}).then(function (result) {


            for (i in result) {

                let events_id = result[i].dataValues.events_id;
                console.log(events_id);


                if (err) throw err;

                db.collection('AllEvents').find({_id:ObjectId(events_id)}).toArray(function (err, result) {

                    if (err) throw err;
                    console.log(result[0]);

                    ResultArr.push(new objc(result[i].imgUrl,result[i].name,result[i].date,result[i].time))


                })

            }

        })

    })
});

function objc(imgUrl,name,date,time){
    this.imgUrl=imgUrl;
    this.name=name;
    this.date=date;
    this.time=time;
}

module.exports=router;
