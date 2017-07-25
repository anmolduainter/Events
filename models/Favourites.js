/**
 * Created by anmol on 25/7/17.
 */


module.exports = (sequelize,Datatypes)=>{

    const Fav=sequelize.define('Favourites',{

        id:{

            type:Datatypes.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false

        },

        login_id:{
            type:Datatypes.DataTypes.INTEGER,
            allowNull:false
        },

        events_id:{

            type:Datatypes.DataTypes.STRING,
            allowNull:false

        }
    },{
        underscored:true
    });

    return Fav;

};
