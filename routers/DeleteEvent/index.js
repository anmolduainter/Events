/**
 * Created by anmol on 23/7/17.
 */

const router=require('express').Router();
router.use('/',require('./deleteAll'));
router.use('/deleteOne',require('./deleteOne'));
module.exports=router;
