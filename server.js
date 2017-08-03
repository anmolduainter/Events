
let express=require('express');
let bp=require('body-parser');
const path=require('path');
const session=require('express-session');
const cp=require('cookie-parser');
const passport=require('./passport/PassPort.js');
const UserLogin=require('./routers/login');
const UserRegister=require('./routers/Register');
const UserLogout=require('./routers/logOut');
const Events=require('./routers/Events');
const AddEvents=require('./routers/AddEvents');
const deleteEvents=require('./routers/DeleteEvent');
const updateEvents=require('./routers/updateEvents');
const Main=require('./routers/Pages');
const Android=require('./routers/Android');
const flash=require('express-flash');
let app=express();

app.set('view engine','hbs');

app.use(cp('somesecret1'));

app.use(session({
    secret:'somesecret1',
    resave:false,
    saveUninitialized:true
}));

app.use(flash());

app.use(bp.urlencoded({extended:true}))

app.use(bp.json());

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


//app.use('/',express.static(path.join(__dirname+"/public_static")))
// app.use('/private',checkedlogin,express.static(path.join(__dirname+"/private_static")));
app.use(express.static(__dirname + '/public_static'));
app.use('/',Main);
app.use('/login',UserLogin);
app.use('/Register',UserRegister);
app.use('/logout',UserLogout);
app.use('/Events',Events);
app.use('/AddEvents',AddEvents);
app.use('/DeleteEvents',deleteEvents);
app.use('/updateEvents',updateEvents);
app.use('/android',Android);


app.listen(3000,function(){
    console.log("Server Started");
});

