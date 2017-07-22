
const passport=require('passport');
const db=require('../DataBase/sqlDatabase.js');
const localStrategy=require('./Strategies/local.js');
passport.serializeUser(function(user,done){
    console.log("Serealize");
    console.log("Serialize : "+user.id);
    done(null,user.id)
});

passport.deserializeUser(function(id,done){
    console.log("Deserialize")
    db.login.findAll({where:{id:id}}).then(function(user) {
        if (user) {
            done(null, user);
        } else {
            done(user.errors, null);
        }

    });


});
passport.use(localStrategy);
module.exports=passport;






