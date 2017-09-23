
module.exports = (sequelize,Datatypes)=>{

    // Making a table known as UserLocal having password as a coloumn

    const User=sequelize.define('UserLocal',{
        password: Datatypes.DataTypes.STRING
    },{
        underscored:true
    });

    return User;

} ;
