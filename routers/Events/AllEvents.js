/**
 * Created by anmol on 22/7/17.
 */

const router=require('express').Router();
const sqldb=require('../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=>{

    MongoClient.connect(url,function (err,db) {
        if (err) throw err;
        let arr=[];
        db.collection('AllEvents').find({}).sort({date:1}).toArray(function (err,result) {
            if (err) throw err;
            for(i of result){
                sqldb.login.findAll({where:{id:i.Sql}}).then(function (result) {
                    arr.push(new objc(result[0].username,result[0].phone));
                    console.log(arr);
                })
            }
            let done=false;
            let idInterval= setInterval(function () {
                if (done){
                    clearInterval(idInterval);
                }
                else if (arr.length==result.length){


                    res.render('AllEvents',{Result:result,Arr:arr})
                    // res.send({result,arr});

                    done=true;
                }
                else{
                    clearInterval(idInterval);
                }
            },1000);
        });

        db.close();
    });
});

function objc(username,phone){
    this.username=username;
    this.phone=phone;
}

module.exports=router;