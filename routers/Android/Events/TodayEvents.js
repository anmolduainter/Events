/**
 * Created by anmol on 22/7/17.
 */

const router=require('express').Router();
const sqldb=require('../../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=>{

    MongoClient.connect(url,(err,db)=>{

        if (err) throw err;

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
        console.log(timeHr)
        let arr=[];
        let timeArr=[];
        // let registerArr=[];

        db.collection('AllEvents').find({date:dateQ}).toArray(function (err,result) {
            if (err) throw err;



            for(i of result) {

                let StartTime = "";
                let EndTime = "";

                console.log(i.time);

                let arrTime = i.time.split(" - ");


                if (arrTime[0].length == 7) {
                    if (arrTime[0].substr(5, 6) == "AM") {
                        StartTime = arrTime[0].substr(0, 1)
                    }
                    else if (arrTime[0].substr(5, 6) == "PM") {
                        StartTime = (+(arrTime[0].substr(0, 1)) + 12)
                    }
                }

                else if (arrTime[0].length == 8) {
                    if (arrTime[0].substr(6, 7) == "AM") {
                        if (arrTime[0].substr(0, 2) == 12) {
                            StartTime = 0;
                        }
                        else {
                            StartTime = arrTime[0].substr(0, 2)
                        }
                    }
                    else if (arrTime[0].substr(6, 7) == "PM") {
                        if (arrTime[0].substr(0, 2) == 12) {
                            StartTime = 0;
                        }
                        else {
                            StartTime = (+(arrTime[0].substr(0, 2)) + 12)
                        }
                    }
                }


                if (arrTime[1].length == 7) {
                    if (arrTime[1].substr(5, 6) == "AM") {
                        EndTime = arrTime[1].substr(0, 1)
                    }
                    else if (arrTime[1].substr(5, 6) == "PM") {
                        EndTime = (+(arrTime[1].substr(0, 1)) + 12)
                    }
                }

                else if (arrTime[1].length == 8) {
                    if (arrTime[1].substr(6, 7) == "AM") {
                        if (arrTime[1].substr(0, 2) == 12) {
                            EndTime = 0;
                        }
                        else {
                            EndTime = arrTime[0].substr(0, 2)
                        }
                    }
                    else if (arrTime[1].substr(6, 7) == "PM") {
                        if (arrTime[1].substr(0, 2) == 12) {
                            EndTime = 0;
                        }
                        else {
                            EndTime = (+(arrTime[1].substr(0, 2)) + 12)
                        }
                    }
                }


                let What = "";

                if (timeHr < StartTime) {
                    What = "Starting Today"
                    //            registerArr.push(true)
                }
                else if (timeHr > StartTime && timeHr < EndTime) {

                    What = "Going On"
                    //            registerArr.push(true)

                }
                else if (timeHr > EndTime) {

                    What = "Closed"
                    //             registerArr.push(false)
                }


                console.log(What);

                timeArr.push(What);

                console.log(" i : "+i.Sql);

                sqldb.Users.findAll({where: {id: i.Sql}}).then(function (result) {

                    arr.push(new objc(result[0].username, result[0].phone));
                    console.log(arr);

                });

                if (req.user !== undefined) {

                    sqldb.registerEvents.findAll({
                        login_id: req.user[0].dataValues.id,
                        events_id: result[0]._id.toString()
                    }).then(function (result) {

                        if (result == 0) {
                            regArr.push(false);
                        }
                        else {
                            regArr.push(true);
                        }

                    })

                }
            }

            let regArr=[];

            let done=false;
            let idInterval= setInterval(function () {

                if (done){
                    clearInterval(idInterval);
                }

                else if (arr.length==result.length){

                    if (result.length==0){

                        let LoggedIn

                        if (req.user==undefined){
                            LoggedIn=false;
                            res.send({Today:false,LoggedIn:LoggedIn})
                        }
                        else{
                            LoggedIn=true;
                            res.send({Today:false,LoggedIn:LoggedIn})
                        }

                    }
                    else{
                        let LoggedIn;
                        if (req.user==undefined){

                            LoggedIn=false;
                            // res.send("First Login");
                            res.send({Result:result,Arr:arr,TimeArr:timeArr,Today:true,LoggedIn:LoggedIn});


                        }
                        else{
                            LoggedIn=true;

                            console.log(regArr);

                            res.send({Result:result,Arr:arr,TimeArr:timeArr,Today:true,RegArr:regArr,LoggedIn:LoggedIn});

                        }


                    }
                    done=true;

                }
                else{

                    clearInterval(idInterval);

                }

            },1000);

        });

        db.close();

    })
});

function objc(username,phone){
    this.username=username;
    this.phone=phone
}

module.exports=router;
