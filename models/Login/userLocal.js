/**
 * Created by anmol on 18/7/17.
 */


module.exports = (sequelize,Datatypes)=>{

    const User=sequelize.define('UserLocal',{

        password: Datatypes.DataTypes.STRING

    },{
        underscored:true
    });

    return User;

} ;
