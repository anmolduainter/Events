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
db.fav=require('../models/Favourites.js')(sequelize,Sequelize);
db.leader=require('../models/LeaderBoard.js')(sequelize,Sequelize);

db.fav.belongsTo(db.login);
db.login.hasMany(db.fav);

sequelize.sync().then(function () {
    console.log("DataBase is ready");
});


module.exports=db




