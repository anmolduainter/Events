/**
 * Created by anmol on 22/7/17.
 */

const router=require('express').Router();
router.use('/',require('./web'));
router.use('/and',require('./android'));
module.exports=router;

