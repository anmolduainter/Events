/**
 * Created by anmol on 14/8/17.
 */


const router=require('express').Router();

router.use('/Today',require('./Today'));
router.use('/Technology',require('./Technology'));
router.use('/OutDoors',require('./OutDoors'));

module.exports=router;