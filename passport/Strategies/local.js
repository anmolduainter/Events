/**
 * Created by anmol on 22/7/17.
 */

const LocalStrategy=require('passport-local').Strategy;
const db=require('../../DataBase/sqlDatabase.js');


module.exports=new LocalStrategy(

    {
        usernameField : 'username',
        passwordField : 'password',
    },

    function (username,password,done) {

        console.log(username);
        console.log(password);

    db.UserLocal.findOne
    (
        {
            where:{
                password:password
            }
        },
        {
            include:[{model:db.Users,where:{email:username}}]
        }
    ).then(function (result) {

        //console.log(result);
        return done(null,result)

    });

});