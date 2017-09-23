
const router=require('express').Router();

router.use('/',(req,res,next)=>{
    res.render('AddEvent');
});

module.exports=router;
