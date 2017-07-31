/**
 * Created by anmol on 18/7/17.
 */


module.exports = (sequelize,Datatypes)=>{

    const User=sequelize.define('user',{

        id:{

            type:Datatypes.DataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true,

        },
        username:{
            type:Datatypes.DataTypes.STRING,
        },

        email:{
            type:Datatypes.DataTypes.STRING,
        },

        phone:{
            type:Datatypes.DataTypes.BIGINT,
        }


    },{
        underscored:true
    });

    return User;

} ;
