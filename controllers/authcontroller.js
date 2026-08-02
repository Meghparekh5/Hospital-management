const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{

    try{

        const {name,email,password,role,mobile}=req.body;

        const exists = await User.findOne({email});

        if(exists){
            return res.status(400).json({
                success:false,
                message:"Email Already Exists"
            });
        }

        const hash = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hash,
            role,
            mobile
        });

        res.status(201).json({
            success:true,
            message:"Registration Successful",
            user
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};

const login = async(req,res)=>{

    try{

        const {email,password}=req.body;

        const user = await User.findOne({email});

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User Not Found"
            });

        }

        const match = await bcrypt.compare(password,user.password);

        if(!match){

            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            });

        }

        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRE
            }
        );

        res.status(200).json({
            success:true,
            token,
            user
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};

const changePassword = async(req,res)=>{

    try{

        const {oldPassword,newPassword}=req.body;

        const user = await User.findById(req.user.id);

        const match = await bcrypt.compare(oldPassword,user.password);

        if(!match){

            return res.status(400).json({
                success:false,
                message:"Old Password Incorrect"
            });

        }

        const hash = await bcrypt.hash(newPassword,10);

        user.password = hash;

        await user.save();

        res.status(200).json({
            success:true,
            message:"Password Changed Successfully"
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};

module.exports={
    register,
    login,
    changePassword
};