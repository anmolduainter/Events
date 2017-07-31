/**
 * Created by anmol on 31/7/17.
 */

const FacebookStrategy=require('passport-facebook').Strategy;
const Sqldb=require('./../../DataBase/sqlDatabase');
const Auth=require('./../../Auth/auth');

module.exports=new FacebookStrategy({
        clientID: Auth.facebookAuth.clientId,
        clientSecret: Auth.facebookAuth.clientSecret,
        callbackURL: Auth.facebookAuth.callbackUrl,
        profileFields: ['id', 'emails', 'name'],  // This line is important
        passReqToCallback: true
    },
    function(req,accessToken, refreshToken, profile, cb) {

        let profileJson = profile._json;
        console.log(accessToken);
        let oldUser = req.user;

        if (oldUser) {
            if (config.DEBUG) console.log('User exists, is connecting Facebook account');
            Sqldb.Userfacebook.upsert({
                id: profileJson.id,
                authtoken: accessToken,
                login_id: oldUser.id
            }).then(function (updated) {
                return Sqldb.Users.findById(oldUser.id)
            }).then(function (user) {
                return cb(null, user.get())
            })
        } else {
            Sqldb.Userfacebook.findCreateFind({
                include: [Sqldb.Users],
                where: {id: profileJson.id},
                defaults: {
                    id: profileJson.id,
                    authtoken: accessToken,
                    user: {
                        username: profileJson.first_name+' '+profileJson.last_name,
                        email: profileJson.email,
                        phone:123456789
                    }
                }
            }).spread(function(userFacebook, created) {
                if (!userFacebook) {
                    return cb(null, false);
                }
                return cb(null, userFacebook.user.get())
            });
        }




    }
);
