
const router=require('express').Router();
const sqldb=require('../../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=>{

    let loggedIn;

    let UserId;

    console.log(req.user);

    /* Checking if user is undefined or not
       if undefined means user not logged in
       if not undefined means user is logged in and thus taking user id.
    */
    if (req.user==undefined){
        loggedIn=false;
    }
    else{
        UserId=req.user[0].dataValues.id;
        loggedIn=true
    }

    //Connecting To the MongoClient
    MongoClient.connect(url,function (err,db) {

        //if err occurred then throw it
        if (err) throw err;
        let arr=[];
        let fav=[];
        let registerEv=[];


        /* Getting date object ( Current Date )
           and getting date , month and year from this date object
           and representing this in format yyyy-mm-dd
        */

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


         /*
           Finding All Events Which Are Upcoming Means That events are sorted according to the date and
            $gte: dateQ here implies greater than this date.
         */

        db.collection('AllEvents').find({date:{$gte : dateQ}}).sort({date:1}).toArray(function (err,result) {

            //if error occured then throw the error
            if (err) throw err;

            //Taking Object from result array one by one
            for(i of result){

                //getting Phone Number and username according to the event id
                sqldb.Users.findAll({where:{id:i.Sql}}).then(function (result) {
                    arr.push(new objc(result[0].username,result[0].phone));
                    console.log(arr);
                });


                /* Checking if user is not undefined

                  if not defined : -

                    1. Getting all data of BookMarked (Favourites) Events .
                    2. Getting all data of Registered Events.

                */
                if (req.user !== undefined) {
                    sqldb.fav.findAll({where: {login_id: UserId, events_id: i._id.toString()}}).then((result) => {
                        if (result.length == 0) {
                            fav.push(false);
                        }
                        else {
                            fav.push(true);
                        }
                    });

                    sqldb.registerEvents.findAll({where: {login_id: UserId, events_id: i._id.toString()}}).then((result) => {
                        if (result.length == 0) {
                            registerEv.push(false);
                        }
                        else {
                            registerEv.push(true);
                        }
                    })
                }
            }

            // Assuming done is false
            let done=false;

            /*Response should only be send if
               result length == arr length
               if this is true then make done true and make the interval clear
              */

            let idInterval= setInterval(function () {
                if (done){
                    clearInterval(idInterval);
                }
                else if (arr.length==result.length){
                    console.log(loggedIn);

                    /*
                        Res contains : -

                           1. Result (Array)
                           2.Arr (array) - phone and username
                           3.LoggedIn info - True or false
                           4. Fav (Array) - all Bookmarked events by User.
                           5. Reg (Array) - All Registered Events By User.


                     */

                    console.log(fav);
                    console.log(registerEv);

                    if (req.user!=undefined){
                        console.log(fav);
                        res.send({Result:result,Arr:arr,LoggedIn:loggedIn,Fav:fav,Reg:registerEv})
                    }
                    else{
                        res.send({Result:result,Arr:arr,LoggedIn:loggedIn})
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
