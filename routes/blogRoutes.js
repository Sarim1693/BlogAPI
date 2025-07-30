const express=require('express');
const Blog=require('./../models/Blog');
const router=express.Router();
const Person=require('./../models/Person');
router.post('/create', async(req, res)=>{
    try{
        const {title, content, username}=req.body;
        const user= await Person.findOne({username});
        if(!user) res.status(404).json({error: 'User Not found'});
        const newblog= new Blog({
            title,
            content,
            author:user._id
        });
        const response=await newblog.save();
        res.status(200).json(response);
    }
    catch(err){
        console.log('Error occured ', err);
        res.status(500).json({err: 'Failed to Create the blog'});
    }
});
router.get('/all', async(req, res)=>{
    try{
        const data=await Blog.find().populate('author', 'username email');
        res.status(200).send(data);
    }
    catch(err){
        console.log('Error Occured ',err);
        res.status(500).json({err: 'Internal Server Error'});
    }
});


router.get('/:username', async (req, res) => {
    try {
        const person = await Person.findOne({ username: req.params.username });

        if (!person) {
            return res.status(404).json({ error: "User not found" });
        }

        const blogs = await Blog.find({ author: person._id });

        res.status(200).json(blogs);
    } catch (err) {
        console.log('Error Occurred:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports=router;