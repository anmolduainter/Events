/**
 * Created by anmol on 26/7/17.
 */


const router=require('express').Router();
const sqldb=require('../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=> {

    let ResultArr=[];

    let date1=new Date();
    let dd = date1.getDate();
    let mm = date1.getMonth()+1;
    let yyyy = date1.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    dateQ =yyyy + '-' + mm + '-' + dd;

    console.log(dateQ);


    let timeHr=date1.getHours();
    let timeMin=date1.getMinutes();


    MongoClient.connect(url, (err, db) => {

        sqldb.registerEvents.findAll({where: {user_id: req.user[0].dataValues.id}}).then(function (result) {


            for (i in result) {

                let events_id = result[i].dataValues.events_id;
                console.log(events_id);


                if (err) throw err;

                db.collection('AllEvents').find({_id:ObjectId(events_id)}).toArray(function (err, result) {

                    if (err) throw err;
                   //res.send(result);

                  //  console.log(result[0]);

                    // console.log(result[0].imgUrl);

                    ResultArr.push(new objc(result[0].imgUrl,result[0].name,result[0].date,result[0].time,result[0].desc))


                })

            }


            let clrId=setInterval(function () {

                if (result.length==ResultArr.length){
                    clearInterval(clrId);
                    res.render('RegisterEvents',{ResultArr:ResultArr});
                }

            },1000);

            db.close();

        })

    })
});


router.get('/a',(req,res)=> {

    let ResultArr=[];

    MongoClient.connect(url, (err, db) => {

        sqldb.registerEvents.findAll({where: {user_id: req.user[0].dataValues.id}}).then(function (result) {


            for (i in result) {

                let events_id = result[i].dataValues.events_id;
                console.log(events_id);


                if (err) throw err;

                db.collection('AllEvents').find({_id:ObjectId(events_id)}).toArray(function (err, result) {

                    if (err) throw err;
                    //res.send(result);

                    //  console.log(result[0]);

                    // console.log(result[0].imgUrl);

                    ResultArr.push(new objc(result[0].imgUrl,result[0].name,result[0].date,result[0].time,result[0].desc))


                })

            }


            let clrId=setInterval(function () {

                if (result.length==ResultArr.length){
                    clearInterval(clrId);
                    res.send({ResultArr:ResultArr});
                }

            },1000);

            db.close();

        })

    })
});





router.post('/',(req,res)=>{

    MongoClient.connect(url,(err,db)=>{

        let query={
            name:req.body.name,
            date:req.body.date,
            time:req.body.time
        };


        db.collection('AllEvents').find(query).toArray(function (err,result) {

            if (err) throw err;

            console.log(result[0]._id);

           sqldb.registerEvents.destroy({where:{user_id:req.user[0].dataValues.id,events_id:result[0]._id.toString()}}).then(function (row) {

               if (row==1){
                   res.send({success:true});
               }

               else{
                   res.send({success:true});
               }


           })



        })


    });


});



function objc(imgUrl,name,date,time,desc){
    this.imgUrl=imgUrl;
    this.name=name;
    this.date=date;
    this.time=time;
    this.desc=desc;
}

module.exports=router;
