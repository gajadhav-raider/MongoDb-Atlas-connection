const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/userSchema')
const authentication = require('../middleware/authentication');
router.get('/',(req,res)=>{
    res.send("Welcome from Server Router");
});

router.post('/register',async(req,res)=>{
    const{ name , email , phone , work , password , cpassword} = req.body;
      if(!name||!email||!phone||!work||!password||!cpassword)
      {
         return res.status(422).json({error : "please filled the field" });
      }
        try {
            const userExist= await  User.findOne({ email:email }); 
          if(userExist)
          {
              return res.status(422).json({error : " This Email is allready exist" });
          } else if(password !=cpassword)
          {              
            return res.status(422).json({error : " Password Not Matching " });
          }else
          {           
        const user = new User({name,email,phone,work,password,cpassword});
        await user.save();
        res.status(201).json({message:"User Registration successful"});
          }
        
        } catch (error) {
            console.log(error);
        }   
});
         router.post('/signin',async(req,res)=>{      
           try 
           { let token;
            const {email,password}= req.body;
            if(!email||!password)
            {
                return res.status(400).json({message:"Please enter the fields"});
            }
               const userlogin = await User.findOne({email:email});
               if(userlogin)
               {
                const isMatch = await bcrypt.compare(password,userlogin.password)
                token = await userlogin.generateAuthToken();
                 res.cookie("jwtoken",token,{
                     expires: new Date(Date.now() + 25892000000 ),
                     httpOnly:true
                 });
                if(!isMatch)
                {
                  res.status(400).json({error:"Invalid Credintial"});
                }   else
                {         
                res.status(201).json({message:"User Login Successfully"});
                }
               }
               else
               {
                res.status(400).json({error:"Invalid Credintial"});                    
               }
           } catch (error) {
               console.log(error);
           }
         })
         
router.get('/about',authentication,(req,res)=>{
  console.log("this the About Page");
  res.send(req.rootUser);
});
module.exports = router;