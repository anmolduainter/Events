/**
 * Created by anmol on 30/7/17.
 */

const router=require('express').Router();
router.use('/',require('./login/beforeLogin'),require('./login/afterLogin'));
module.exports=router;