
let express=require('express');
let bp=require('body-parser');
const path=require('path');
const session=require('express-session');
const cp=require('cookie-parser');
const passport=require('./passport/PassPort.js');
const UserLogin=require('./routers/login');
const AllEvents=require('./routers/AllEvents')
let db;
let app=express();

app.use(cp('somesecret1'));

app.use(session({
    secret:'somesecret1',
    resave:false,
    saveUninitialized:true
}));

app.use(bp.urlencoded({extended:true}))

app.use(bp.json());

app.use(passport.initialize())
app.use(passport.session())

function checkedlogin(req,res,next){
    if (req.user){
        next();
    }
    else{
        res.status(404).send("Unauthorized");
    }
}
app.use('/public',express.static(path.join(__dirname+"/public_static")))
app.use('/private',checkedlogin,express.static(path.join(__dirname+"/private_static")));
app.use('/login',UserLogin);
app.use('/AllEvents',AllEvents);

// app.post('/save',function (req,res) {
//
//     db.collection('invent').insertOne({item:req.body.name})
//         .then(function(result) {
//
//               res.send(result);
//
//         });
//
// });
//
//
//
// app.post('/YourEvents',function (req,res) {
//
//     db.collection('AllEvents').find({Sql:req.body.id}).toArray(function (err,result) {
//
//         if (err) throw err;
//
//         res.send(result)
//
//     })
//
// });
//
//
//
//
app.get('/TodayEvents',function (req,res) {

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

    db.collection('AllEvents').find({date:dateQ}).toArray(function (err,result) {
        if (err) throw err;



        for(i of result){

            let StartTime="";
            let EndTime="";

            console.log(i.time);

            let arrTime=i.time.split(" - ");


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




            let What="";

            if (timeHr<StartTime){
                What="Starting Today"
            }
            else if (timeHr>StartTime && timeHr<EndTime){

                What="Going On"

            }
            else if (timeHr>EndTime){

                What="Closed"

            }


            console.log(What);

            timeArr.push(What);


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

                res.send({result,arr,timeArr});
                done=true;
            }
            else{

                clearInterval(idInterval);

            }

        },1000);

    })

});
//
// function objc(username,phone){
//
//     this.username=username;
//     this.phone=phone;
//
// }
//
//
// app.post('/delete',function (req,res) {
//
//     db.collection('AllEvents').deleteMany({},function (err,result) {
//
//         res.send("Deleted");
//
//     })
//
// });
//
//
// app.post('/deleteOneEvent',function (req,res) {
//
//     db.collection('AllEvents').deleteOne({Sql:req.body.id,name:req.body.name,date:req.body.date,time:req.body.time},function (err,result) {
//
//         res.send({success:true});
//
//     })
//
//
// });
//
//
// app.post('/updateEditEvent',function (req,res) {
//
//     let oldObj={Sql:req.body.id,name:req.body.name,date:req.body.date,time:req.body.time}
//
//     let newObj={$set : {imgUrl:req.body.imageUrl,name:req.body.name1,date:req.body.date1,time:req.body.time1,desc:req.body.desc1}}
//
//     db.collection('AllEvents').updateOne(oldObj,newObj,function (err,result) {
//
//         console.log(result);
//
//         res.send({success:true});
//
//     })
//
//
// });
//
//
//
// //
// // function getCur(db){
// //
// //     let cursor=db.collection('inventory').find({status:"D"}).toArray(function (err,result) {
// //         if (err) throw err;
// //         console.log(result[0].item)
// //     })
// //
// //    // console.log(cursor)
// //
// // }
//
//
// app.post('/AddEvent',(req,res)=>{
//
//     let id=(req.body.id.toString());
//     let title=(req.body.title);
//     let imgURL=req.body.imageUrl;
//         let date=req.body.date.toString()
//     let time=req.body.time;
//         let desc=req.body.desc;
//
//         console.log(id)
//         console.log(title)
//       console.log(imgURL)
//     console.log(date)
//     console.log(time)
//     console.log(desc)
//
//
//     db.collection('AllEvents').insertOne(
//
//         { Sql:id, imgUrl:imgURL, name: title,
//             date:date,time:time,desc:desc , going:0 , interested:0 , like:0 , notlike:0 }
//
//
//     )
//
//         .then(function(result) {
//             console.log(result);
//             res.send({success:true});
//         })
//
//
//
// });
//
//
//
// app.post('/register',(req,res)=>{
//
//     sqldb.login.create({username : req.body.username,
//                         password : req.body.password,
//                         email : req.body.email,
//                         phone: req.body.phone
//                     }).then(function (data) {
//
//                        res.send({success:true,id:data.id,email:data.email});
//
//         }).catch(function (err) {
//
//           throw err;
//
//        })
// });
//
// app.post('/registerCheck',(req,res)=>{
//
//    sqldb.login.findAll({where:{username:req.body.username}}).then(function(result){
//
//        if (typeof(result[0])=='undefined'){
//            res.send({success:false})
//        }
//        else {
//            res.send({success:true});
//        }
//
//    })
//
// });
// //
// // app.post('/login',(req,res)=>{
// //
// //     sqldb.login.findAll({where:{email:req.body.email,password:req.body.password}}).then(function (result) {
// //
// //         if (typeof(result[0])=='undefined'){
// //             res.send({success:false})
// //         }
// //         else {
// //             console.log(result[0].id);
// //             console.log(result[0].email)
// //             res.send({success:true,id:result[0].id,email:result[0].email});
// //         }
// //     });
// //
// // });

app.listen(3000,function(){
    console.log("Server Started");
});