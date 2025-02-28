const catagoryModel=require('../../Models/Catagory/CatagoryModel')

exports.createCatagory=async(req,res)=>{
    const {name}=req.body;

    try{
        await catagoryModel.createCatagory({name})
        const  catagories=await catagoryModel.getCatagory();
        res.status(200).json(catagories)
    }catch(error){
        res.status(500).json("Error creating catagory")
    }
}

exports.getCatagory=async(req,res)=>{
    try{
        const catagory= await catagoryModel.getCatagory();
        res.status(200).json(catagory)
    }catch(error){
        res.status(500).json("Error fetching catagory")
    }
}