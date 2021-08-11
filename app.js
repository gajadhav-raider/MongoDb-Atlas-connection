const dotenv = require('dotenv');
const express= require('express');
const app=express();
 dotenv.config({ path:"./config.env" });
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth.js'));

  const PORT = process.env.PORT;
  

app.get('/',(req,res)=>{
    res.send("Welcome from Server");
});
// app.get('/about',middleware,(req,res)=>{
//     res.send("this the About Page");
// });
app.get('/contact',(req,res)=>{
    //res.cookie("Test","CrossCountry");
    res.send("Welcome  ContactPage from Server");
});
app.get('/signin',(req,res)=>{
    res.send("Welcome Login from Server ");
});
app.get('/signup',(req,res)=>{
    res.send("Welcome for Registration page from Server");
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} Port `);
});