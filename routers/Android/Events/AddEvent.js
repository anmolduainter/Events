
const router=require('express').Router();

const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.post('/',(req,res)=>{

    console.log("AddEvent Called ---------------------- >>>>>>>>>>>>>>>>>>>")


    MongoClient.connect(url,(err,db)=>{

        if (err) throw err;

        let id=(req.user[0].dataValues.id);
        let title=(req.body.title);
        let imgURL=req.body.imageUrl;
        let date=req.body.date.toString()
        let time=req.body.time;
        let desc=req.body.desc;

        console.log(id)
        console.log(title)
        console.log(imgURL)
        console.log(date)
        console.log(time)
        console.log(desc)

        db.collection('AllEvents').insertOne(

            { Sql:id.toString(), imgUrl:imgURL, name: title,
                date:date,time:time,desc:desc , going:0 , interested:0 , like:0 , notlike:0 }

        ).then(function(result) {
            console.log(result);
            res.send({success:true});
        })

        db.close();
     });
});


module.exports=router;