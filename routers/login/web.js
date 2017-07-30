/**
 * Created by anmol on 30/7/17.
 */

const router=require('express').Router();
const passport=require('../../passport/PassPort.js');

router.get('/',function (req,res) {
    if (req.user==undefined){
        res.render('login');
    }
    else{
        res.redirect('/');
    }
});

router.post('/',passport.authenticate('local',{
    failureRedirect:'/',
    successRedirect:'/'
}));

module.exports=router;