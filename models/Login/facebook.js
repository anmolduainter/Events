

module.exports = (sequelize,Datatypes)=>{

    const User=sequelize.define('UserFacebook',{

        id:{

            type:Datatypes.DataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true,

        },
        authtoken:{
            type:Datatypes.DataTypes.STRING,
        }

    },{
        underscored:true
    });

    return User;

} ;
