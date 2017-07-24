/**
 * Created by anmol on 24/7/17.
 */

const router=require('express').Router();

router.get('/',(req,res)=>{
   req.user=null;
   req.logOut();
   req.session.destroy(function (err) {
       res.redirect('/')
   })
});

module.exports=router;
