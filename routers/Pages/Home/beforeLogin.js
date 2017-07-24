/**
 * Created by anmol on 24/7/17.
 */


const cel=require('connect-ensure-login');
const router=require('express').Router();
const db=require('../../../DataBase/sqlDatabase');

router.get('/',(req,res,next)=>{

    console.log("............")
    //console.log(req.user);
    if (req.user==undefined){
        res.render('index',{loggedIn:false});
    }
    else{
        console.log("afterLogin");
        next();
    }

});


module.exports=router;