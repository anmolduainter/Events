
const router=require('express').Router();

const sqldb=require('../../../DataBase/sqlDatabase.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;

let url = 'mongodb://localhost:27017/myproject';

router.get('/',(req,res)=> {



    console.log("-------------------------REGISTERED EVENTS --------------------------------")


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


    let timeArr=[];

    MongoClient.connect(url, (err, db) => {

        sqldb.registerEvents.findAll({where: {user_id: req.user[0].dataValues.id}}).then(function (result) {

            let StartTime="";
            let EndTime="";


            for (i in result) {

                let events_id = result[i].dataValues.events_id;
                console.log(result[i]);


                if (err) throw err;

                db.collection('AllEvents').find({_id:ObjectId(events_id)}).toArray(function (err, result) {

                    if (err) throw err;
                    //res.send(result);

                    //  console.log(result[0]);

                     // console.log(result[0].imgUrl);


                    console.log(result[0].time);


                    let arrTime=result[0].time.split(" - ");


                    if (arrTime[0].length==7){
                        if (arrTime[0].substr(5,6)=="AM"){
                            StartTime = arrTime[0].substr(0,1)
                        }
                        else if (arrTime[0].substr(5,6)=="PM"){
                            StartTime = (+(arrTime[0].substr(0,1))+12)
                        }
                    }

                    else if (arrTime[0].length==8){
                        if (arrTime[0].substr(6,7)=="AM") {
                            if (arrTime[0].substr(0, 2) == 12) {
                                StartTime=0;
                            }
                            else {
                                StartTime = arrTime[0].substr(0, 2)
                            }
                        }
                        else if (arrTime[0].substr(6,7)=="PM") {
                            if (arrTime[0].substr(0, 2) == 12) {
                                StartTime = 0;
                            }
                            else {
                                StartTime = (+(arrTime[0].substr(0, 2)) + 12)
                            }
                        }
                    }



                    if (arrTime[1].length==7){
                        if (arrTime[1].substr(5,6)=="AM"){
                            EndTime = arrTime[1].substr(0,1)
                        }
                        else if (arrTime[1].substr(5,6)=="PM"){
                            EndTime = (+(arrTime[1].substr(0,1))+12)
                        }
                    }

                    else if (arrTime[1].length==8){
                        if (arrTime[1].substr(6,7)=="AM") {
                            if (arrTime[1].substr(0, 2) == 12) {
                                EndTime=0;
                            }
                            else {
                                EndTime = arrTime[0].substr(0, 2)
                            }
                        }
                        else if (arrTime[1].substr(6,7)=="PM") {
                            if (arrTime[1].substr(0, 2) == 12) {
                                EndTime = 0;
                            }
                            else {
                                EndTime = (+(arrTime[1].substr(0, 2)) + 12)
                            }
                        }
                    }

                    console.log("date Q : "+dateQ)

                    console.log("Time Hr : " + timeHr);

                    console.log("Start Time : "+StartTime);

                    console.log("End Time : " + EndTime)

                    if (dateQ==result[0].date){

                        if (timeHr<StartTime){
                            console.log("less")
                            timeArr.push(false);
                        }
                        else if (timeHr>StartTime && timeHr<EndTime){
                            timeArr.push(false)
                        }
                        else if (timeHr>=EndTime){
                            timeArr.push(true)

                        }
                    }
                    else if (dateQ>result[0].date){

                        console.log("DateQ eneterd")

                        timeArr.push(true);

                    }

                    else if (dateQ<result[0].date){
                        timeArr.push(false);
                    }


                    ResultArr.push(new objc(result[0].imgUrl,result[0].name,result[0].date,result[0].time,result[0].desc))


                })

            }


            let clrId=setInterval(function () {

                if (result.length==ResultArr.length){
                    clearInterval(clrId);
                    console.log(timeArr);
                    res.send({ResultArr:ResultArr,TimeArr:timeArr});
                }

            },1000);

            db.close();

        })

    })
});


function objc(imgUrl,name,date,time,desc){
    this.imgUrl=imgUrl;
    this.name=name;
    this.date=date;
    this.time=time;
    this.desc=desc;
}

module.exports=router;