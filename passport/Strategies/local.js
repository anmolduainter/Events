/**
 * Created by anmol on 22/7/17.
 */

const LocalStrategy=require('passport-local').Strategy;
const db=require('../../DataBase/sqlDatabase.js');


module.exports=new LocalStrategy(function (username,password,done) {

    db.login.findAll({where:{email:username,password:password}}).then(function (result) {
        return done(null,result[0])
    });

});