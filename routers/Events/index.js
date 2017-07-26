/**
 * Created by anmol on 22/7/17.
 */


const router=require('express').Router();
router.use('/',require('./AllEvents'));
router.use('/TodayEvents',require('./TodayEvents'));
router.use('/YourEvents',require('./YourEvents'));
router.use('/BookMark',require('./BookMark'));
router.use('/Register',require('./Register'));
module.exports=router;