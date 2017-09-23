
module.exports = (sequelize,Datatypes)=>{

    //Making a table known as "user" having coloumns - id,username,email,phone

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
