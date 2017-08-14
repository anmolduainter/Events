/**
 * Created by anmol on 22/7/17.
 */

const router=require('express').Router();
const sqldb=require('../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=>{

    let loggedIn;

    let UserId;

    console.log(req.user);

    if (req.user==undefined){
        loggedIn=false;
    }
    else{
        UserId=req.user[0].dataValues.id;
        loggedIn=true
    }

    MongoClient.connect(url,function (err,db) {
        if (err) throw err;
        let arr=[];
        let fav=[];
        let registerEv=[];

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


        db.collection('AllEvents').find({date:{$gte : dateQ}}).sort({date:1}).toArray(function (err,result) {
            if (err) throw err;
            for(i of result){
                sqldb.Users.findAll({where:{id:i.Sql}}).then(function (result) {
                    arr.push(new objc(result[0].username,result[0].phone));
                    console.log(arr);
                });

                if (req.user !== undefined) {

                    sqldb.fav.findAll({where: {login_id: UserId, events_id: i._id.toString()}}).then((result) => {

                        if (result.length == 0) {

                            fav.push(false);

                        }
                        else {

                            fav.push(true);

                        }

                    })



                    sqldb.registerEvents.findAll({where: {user_id: UserId, events_id: i._id.toString()}}).then((result) => {

                        if (result.length == 0) {

                            registerEv.push(false);

                        }
                        else {

                            registerEv.push(true);

                        }

                    })


                }

            }
            let done=false;
            let idInterval= setInterval(function () {
                if (done){
                    clearInterval(idInterval);
                }
                else if (arr.length==result.length){


                    console.log(loggedIn);

                    if (req.user!==undefined){
                        console.log(fav);

                            res.render('AllEvents',{Result:result,Arr:arr,LoggedIn:loggedIn,Fav:fav,Reg:registerEv});


                    }

                    else{
                        res.render('AllEvents',{Result:result,Arr:arr,LoggedIn:loggedIn});
                    }

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