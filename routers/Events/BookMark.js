/**
 * Created by anmol on 25/7/17.
 */

const router=require('express').Router();
const Sqldb=require('../../DataBase/sqlDatabase');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=>{

    MongoClient.connect(url,(err,db)=>{

        let query={};


        console.log(req.user[0].dataValues.id);
      console.log(req.body.name);
      console.log(req.body.date);
      console.log(req.body.time);

      let SqlId=req.user[0].dataValues.id.toString();
      let name=req.body.name.toString();
      let date=req.body.date.toString();
      let time=req.body.time.toString();


        db.collection('AllEvents').find({name:name,date:date,time:time}).toArray((err,result)=>{
            if (err) throw err;
            console.log(result[0]._id);
            let UserId=req.user[0].dataValues.id;
            let EventId=result[0]._id;

            let query={
                user_id:UserId,
                events_id:EventId.toString()
            };

            Sqldb.fav.findAll({where:query}).then((resultQuery)=>{

                if (resultQuery.length==0){

                    Sqldb.fav.create(query).then((resultCre)=>{
                        console.log(resultCre);
                        if (resultCre){
                            res.send({success:true});
                        }
                        else{
                            res.send({success:false})
                        }
                    })


                }

                else{

                    Sqldb.fav.destroy({where:query}).then((resultDel)=>{

                        if (resultDel==1){
                            res.send({success:false})
                        }
                        else{
                            res.send({success:true});
                        }

                    })

                }

            });


        });
        db.close();

    })


});


module.exports=router;
