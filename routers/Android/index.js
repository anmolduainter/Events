/**
 * Created by anmol on 30/7/17.
 */

const router=require('express').Router();
router.use('/',require('./login/afterLogin'));
router.use('/b',require('./login/beforeLogin'));
module.exports=router;