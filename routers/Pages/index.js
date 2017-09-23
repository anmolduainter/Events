/**
 * Created by anmol on 24/7/17.
 */

const router=require('express').Router();
router.use('/',require('./Home/beforeLogin'),require('./Home/afterLogin'));
router.use('/AddEvents',require('./AddEvents'));
module.exports=router;