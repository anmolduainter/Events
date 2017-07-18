/**
 * Created by anmol on 18/7/17.
 */


module.exports = (sequelize,Datatypes)=>{

    const Login=sequelize.define('login',{

        id:{

            type:Datatypes.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false

        },
        username:{
            type:Datatypes.DataTypes.STRING,
            allowNull:false
        },

        password:{

            type:Datatypes.DataTypes.STRING,
            allowNull:false

        },

        email:{
            type:Datatypes.DataTypes.STRING,
            allowNull:false
        },

        phone:{
            type:Datatypes.DataTypes.BIGINT,
            allowNull:false
        }


    },{
        underscored:true
    })

    return Login;

} ;
