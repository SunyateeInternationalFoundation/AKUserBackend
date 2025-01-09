const Parents = require('../models/parents')


function isStringInvalid(string) {
    return string === undefined || string.length === 0;
  }
  

const signUp = async(req, res)=>{
    const {name, email, password , phone} = req.body;
    if(isStringInvalid(email) || isStringInvalid(password) || isStringInvalid(phone) || isStringInvalid(name) ){
        return res.status(400).json({message: 'All fields are required'});
    }
    try{
        const parentExist = await Parents.findOne({email});
        if(parentExist){
            return res.status(400).json({message: 'Email already exists'});
        }
        const newParent = new Parents({name, email, password, phone});
        await newParent.save();
        res.status(201).json({success: true,message: 'User registered successfully', data: newParent});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server Error'});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(isStringInvalid(email) || isStringInvalid(password)){
        return res.status(400).json({message: 'All fields are required'});
    }
    try{
        const parent = await Parents.findOne({email});
        if(parent.password != password ){
            return res.status(401).json({message: 'Incorrect email or password'});
        }
        res.status(200).json({success:true, message: 'Logged in successfully', data: parent});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: err.message});
    }
}



module.exports = {
    signUp,
    login,
}