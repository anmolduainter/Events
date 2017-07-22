
let express=require('express');
let bp=require('body-parser');
const path=require('path');
const session=require('express-session');
const cp=require('cookie-parser');
const passport=require('./passport/PassPort.js');
const UserLogin=require('./routers/login');
const Events=require('./routers/Events');
const AddEvents=require('./routers/AddEvents');
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
app.use('/Events',Events);
app.use('/AddEvents',AddEvents);

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
// })
app.listen(3000,function(){
    console.log("Server Started");
});