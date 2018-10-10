const express=require('express');
const app=express();
const mongoose=require('mongoose');
const config=require('./config/database');
const bodyParser=require('body-parser');
const passport=require('passport');
const cors=require('cors');


//connect to server
const port=3000;
app.listen(port,()=>{
    console.log("Server connected on port "+port);
});


//Cors MW
app.use(cors());


//Body Parser MW
app.use(bodyParser.json());

//database connect code
mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log('Connected to database'+config.database);
});

mongoose.connection.on('error',(err)=>{
    console.log('db error'+err)
});

//Users
const users=require('./routes/users');
app.use('/users',users);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


