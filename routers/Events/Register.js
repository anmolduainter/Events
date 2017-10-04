
// To register the event

const router=require('express').Router();
const sqlDb=require('../../DataBase/sqlDatabase');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=> {

    // console.log(req.user);

    // connecting MongoClient
    MongoClient.connect(url, (err, db) => {

        // if error occured then throw that error
        if (err) throw err;

        // getting name from body
        let name = req.body.name.toString();

        //getting date from body
        let date = req.body.date.toString();

        //getting time from body
        let time = req.body.time.toString();


        let newValues;

        // getting the result array
        db.collection('AllEvents').find({name: name, date: date, time: time}).toArray((err, result) => {
            if (err) throw err;


            // checking if not authorized
            if (req.user==undefined){

                console.log("not Authorized");
                res.send({success:false,msg:"notAuthorized"});

            }

            else{

                let query={
                   user_id:req.user[0].dataValues.id,
                    events_id:result[0]._id.toString()
                };

                sqlDb.registerEvents.find({where:query}).then(function (result) {

                    console.log(result);

                    if(result==null){


                        sqlDb.registerEvents.create(query).then((result)=>{

                            res.send({success:true});

                        })


                    }
                    else{

                       res.send({success:false,msg:"yup"});

                    }

                });

            }


        });
        db.close();

    });
});

module.exports=router;
