/**
 * Created by anmol on 13/8/17.
 */


const router=require('express').Router();

router.use('/AllEvents',require('./AllEvents'));
router.use('/TodayEvents',require('./TodayEvents.js'))

module.exports=router;