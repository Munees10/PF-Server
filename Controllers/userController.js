const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//register
exports.register = async (req,res)=>{
    console.log('inside register controller function');
    const {username,email,password} = req.body
    // console.log(`${username},${email},${password}`);
    const existingUser = await users.findOne({email})
    try{
        if(existingUser){
        res.status(406).json("Account already exists!!! please login...")
    }else{
        const newUser = new users({
            username,email,password,github:"",linkedin:"",
            profile:""
        })
        await newUser.save()
        res.status(200).json(newUser)   
    }
    }
    catch(err){
        res.status(401).json(`register API failed, Error:${err}`)
    }
   
}

//login
exports.login = async (req,res)=>{
    console.log("inside login function");
    const {email,password} =req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
            res.status(200).json({
                existingUser,token
            })
        }else{
            res.status(404).json(`Incorrect Email / Password`)
        }
    }catch(err){
        res.status(401).json(`Login API failed, Error:${err}`)
    }
}