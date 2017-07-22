/**
 * Created by anmol on 22/7/17.
 */

const router=require('express').Router();
const passport=require('../../passport/PassPort.js');
router.post('/',passport.authenticate('local',{
    failureRedirect:'/public',
    successRedirect:'/public/Profile.html'
}));
module.exports=router;

