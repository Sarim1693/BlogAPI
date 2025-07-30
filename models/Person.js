const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const personSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
personSchema.pre('save', async function(next){
    const person=this;
    if(!person.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash( this.password, salt);
        person.password=hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})
const person=mongoose.model('Person', personSchema);
module.exports=person;