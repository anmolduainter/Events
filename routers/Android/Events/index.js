/**
 * Created by anmol on 13/8/17.
 */


const router=require('express').Router();

router.use('/AllEvents',require('./AllEvents'));
router.use('/RegisteredEvents',require('./RegisteredEvents.js'));
router.use('/TodayEvents',require('./TodayEvents.js'));
router.use('/AddEvents',require('./AddEvent.js'));
router.use('/YourEvents',require('./YourEvents.js'));
module.exports=router;