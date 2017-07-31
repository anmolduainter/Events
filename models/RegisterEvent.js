/**
 * Created by anmol on 26/7/17.
 */

/**
 * Created by anmol on 25/7/17.
 */


module.exports = (sequelize,Datatypes)=>{

    const Reg=sequelize.define('RegisterEvents',{

        id:{

            type:Datatypes.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false

        },

        user_id:{
            type:Datatypes.DataTypes.BIGINT,
            allowNull:false
        },

        events_id:{

            type:Datatypes.DataTypes.STRING,
            allowNull:false

        }
    },{
        underscored:true
    });

    return Reg;

};

