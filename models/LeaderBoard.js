/**
 * Created by anmol on 26/7/17.
 */

module.exports = (sequelize,Datatypes)=>{

    const Fav=sequelize.define('LeaderBoards',{

        id:{

            type:Datatypes.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false

        },
        user_id:{
            type:Datatypes.DataTypes.STRING,
            allowNull:false
        },
        interested:{
            type:Datatypes.DataTypes.BIGINT,
            defaultValue:0,
            allowNull:false
        },
        going:{
            type:Datatypes.DataTypes.BIGINT,
            defaultValue:0,
            allowNull:false
        },
        likes:{
            type:Datatypes.DataTypes.BIGINT,
            defaultValue:0,
            allowNull:false
        },
        disLikes:{
            type:Datatypes.DataTypes.BIGINT,
            defaultValue:0,
            allowNull:false
        }
    },{
        underscored:true
    });

    return Fav;
};
