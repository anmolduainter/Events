
const router=require('express').Router();
router.use('/',require('./login/beforeLogin'),require('./login/afterLogin'));
router.use('/Events',require('./Events'));
router.use('/BookMyShow',require('./BookMyShow'));
router.use('/Insider',require('./Insider'));
router.use('/logOut',require('./logOut'));
module.exports=router;



  /* Not Working Now

   Events High have changed their code very much.

  */

//router.use('/EventsHigh',require('./EventsHigh'));