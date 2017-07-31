/**
 * Created by anmol on 24/7/17.
 */

const cel=require('connect-ensure-login');
const router=require('express').Router();
const db=require('../../../DataBase/sqlDatabase');

router.get('/',cel.ensureLoggedIn('/login'),(req,res,next)=>{

    console.log(req.user[0].dataValues.id);

    db.Users.findOne({where:{id:req.user[0].dataValues.id}}).then((user)=>{
        if (!user){

        }
        else{
            console.log(user);
            res.render('index',{loggedIn:true,user:user})
           // res.send({loggedIn:true,user:user})
        }
    });

});


module.exports=router;