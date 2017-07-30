/**
 * Created by anmol on 24/7/17.
 */

const cel=require('connect-ensure-login');
const router=require('express').Router();
const db=require('../../../DataBase/sqlDatabase');

router.get('/',(req,res,next)=>{

    res.send("{LoggedIn:true}");

});


module.exports=router;