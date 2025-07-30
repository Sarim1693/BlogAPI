const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const Person=require('./../models/Person');
router.post('/register', async(req, res)=>{
    try{
        const {username, email, password}=req.body;
        if(!username || !email || !password){
           return res.status(400).json({error: "All fiedls are required to be filled"});
        }
        const exists= await Person.findOne({$or: [{email}, {username}]});
        if(exists){
            res.status(409).json({error: "username or Email ALredy exits"});
        }
        const newPerson= new Person({username, email, password});
        const response=await  newPerson.save();
        const{password: _, userWithoutPassword}= response.toObject();
        console.log('Data Received');
        res.status(200).json(userWithoutPassword);
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(400).send({err:'Internal Server Error'});
    }
});
router.post('/login', async(req, res)=>{
    const {username, password}=req.body;
    try{
        const user = await Person.findOne({username});
        if(!user){
            return res.status(404).json({error: 'Username is not found'});
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({error: 'Incorrect Password'});
        res.status(200).json({message:'Login Succesfully', user:{username:user.username, email:user.email}});
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(400).json({err: 'Internal Server Error'});
    }
})
module.exports=router;