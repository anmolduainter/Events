/**
 * Created by anmol on 18/7/17.
 */

const Sequelize=require('sequelize');

const sequelize=new Sequelize(

    {
        host:'localhost',
        username:'someuser',
        database:'Event',
        password:'somepass',
        dialect:'mysql',
        define:{
            underscored:true
        }

    }
);

let db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.login=require('../models/login.js')(sequelize,Sequelize);
db.Users=require('../models/Login/login.js')(sequelize,Sequelize);
db.UserLocal=require('../models/Login/userLocal.js')(sequelize,Sequelize);
db.Userfacebook=require('../models/Login/facebook.js')(sequelize,Sequelize);
db.fav=require('../models/Favourites.js')(sequelize,Sequelize);
db.leader=require('../models/LeaderBoard.js')(sequelize,Sequelize);
db.registerEvents=require('../models/RegisterEvent')(sequelize,Sequelize);


db.UserLocal.belongsTo(db.Users);
db.Users.hasOne(db.UserLocal);

db.Userfacebook.belongsTo(db.Users);
db.Users.hasOne(db.Userfacebook);
//
// db.fav.belongsTo(db.Users);
// db.Users.hasMany(db.fav);

db.registerEvents.belongsTo(db.Users);
db.Users.hasMany(db.registerEvents);

db.leader.belongsTo(db.Users);
db.Users.hasMany(db.leader);

sequelize.sync().then(function () {
    console.log("DataBase is ready");
});


module.exports=db;




