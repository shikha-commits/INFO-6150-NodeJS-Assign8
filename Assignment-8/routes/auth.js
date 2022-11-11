const User = require("../models/User")

exports.register= async(req,res)=>{
    const {fullname, email,password}= req.body;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    //Full name validation

    var nameRegex= /^[a-z ,.'-]+$/i;
    if(fullname.length==0)
    {
        return res.status(400).json({ message: "You must enter full name" });
    }
    else if(!nameRegex.test(fullname))
    {
        return res.status(400).json({ message: "Full name can not contain numbers" });

    }


    //email validation
    if(email.length==0)
    {
        return res.status(400).json({ message: "You must enter email address" });
    }
    else if(!emailRegexp.test(email))
    {
        return res.status(400).json({ message: "Email format is invalid. You must have a valid domain name in email" });

    }

    //password validation

    var passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(password.length<6)
    {
        return res.status(400).json({ message: "Password is less than 6 characters" });
    }
    else if(!passwordExpression.test(password))
    {
        return res.status(400).json({ message: "Password should contain atleast one number and one special character"});

    }

    try{
        await User.create({
            fullname,email,password
        }).then(user=> res.status(200).json({message:"User successfully created",user}))
    }
    catch(err)
    {
        res.status(401).json({
            message:"User not successfully created",
            error: err.message
        })
    }

}

exports.update=async(req,res)=>{
    var name = req.params.fullname;
    var nameRegex= /^[a-z ,.'-]+$/i;
   

    var passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const {fullname,password} = req.body;

    if(fullname.length==0)
    {
        return res.status(400).json({ message: "You must enter full name" });
    }
    else if(!nameRegex.test(fullname))
    {
        return res.status(400).json({ message: "Full name can not contain numbers" });

    }
    if(password.length<6)
    {
        return res.status(400).json({ message: "Password is less than 6 characters" });
    }
    else if(!passwordExpression.test(password))
    {
        return res.status(400).json({ message: "Password should contain atleast one number and one special character"});

    }

    const user = await User.findOne({fullname: name})
        if(!user)
        {
            res.status(401).json({message:"User record is not available in database"})
        } 
        else{

            const updatedUser= await User.updateOne({fullname:req.params.fullname},{$set:{fullname:req.body.fullname,password:req.body.password}});
            res.json(updatedUser);    
        }}