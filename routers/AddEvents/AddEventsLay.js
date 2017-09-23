
const router=require('express').Router();

router.get('/',(req,res,next)=>{
    res.render('AddEvent');
});

module.exports=router;
