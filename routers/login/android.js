/**
 * Created by anmol on 30/7/17.
 */

const router=require('express').Router();
const passport=require('../../passport/PassPort.js');
//
// router.get('/',function (req,res) {
//     if (req.user==undefined){
//         console.log("androidLoginFailed");
//         res.send({loggedIn:false});
//     }
//     else{
//         console.log("androidLoggedIn")
//         res.redirect('/Android'); ////////////////////////
//     }
// });

router.post('/',passport.authenticate('local',{
    failureRedirect:'/android',
    successRedirect:'/android'
}));


module.exports=router;