/**
 * Created by anmol on 31/7/17.
 */

const router=require('express').Router();
const Sqldb=require('../../DataBase/sqlDatabase');

router.get('/',function (req,res) {
    if (req.user==undefined){
        res.render('register');
    }
    else{
        res.redirect('/');
    }
});

router.post('/',(req,res)=>{

    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    let phone=req.body.phone;

    console.log(username);
    console.log(email);
    console.log(password);
    console.log(phone);


    Sqldb.Users.findOne({where:{email:email}}).then(function (result) {

        console.log(result);
        if (result==null){


            Sqldb.UserLocal.create(
                {
                    user:{
                       username:username,
                        email:email,
                        phone:phone
                    },
                    password:password
                },
                {
                    include:[Sqldb.Users]
                }
            ).then(function (result) {

                console.log(result);
                res.redirect('/login')

            })

        }
        else{


            req.flash("error","Email already taken");
            res.redirect('/Register');


        }

    })




});

module.exports=router;

