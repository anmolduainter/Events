
const router=require('express').Router();
router.use('/AddEventsL',require('./AddEventsLay'));
router.use('/AddEvent',require('./AddEvent'));
module.exports=router;
