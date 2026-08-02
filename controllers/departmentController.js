const Department = require("../models/Department");

const addDepartment = async (req,res)=>{

    try{

        const {departmentName,description}=req.body;

        const exists = await Department.findOne({departmentName});

        if(exists){
            return res.status(400).json({
                success:false,
                message:"Department Already Exists"
            });
        }

        const department = await Department.create({
            departmentName,
            description
        });

        res.status(201).json({
            success:true,
            message:"Department Added Successfully",
            department
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

const getDepartments = async(req,res)=>{

    try{

        const departments = await Department.find().sort({createdAt:-1});

        res.status(200).json({
            success:true,
            total:departments.length,
            departments
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

const getDepartment = async(req,res)=>{

    try{

        const department = await Department.findById(req.params.id);

        if(!department){

            return res.status(404).json({
                success:false,
                message:"Department Not Found"
            });

        }

        res.status(200).json({
            success:true,
            department
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

const updateDepartment = async(req,res)=>{

    try{

        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );

        if(!department){

            return res.status(404).json({
                success:false,
                message:"Department Not Found"
            });

        }

        res.status(200).json({
            success:true,
            message:"Department Updated Successfully",
            department
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

const deleteDepartment = async(req,res)=>{

    try{

        const department = await Department.findById(req.params.id);

        if(!department){

            return res.status(404).json({
                success:false,
                message:"Department Not Found"
            });

        }

        await department.deleteOne();

        res.status(200).json({
            success:true,
            message:"Department Deleted Successfully"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

module.exports={
    addDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment
};