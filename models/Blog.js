const mongoose=require('mongoose');
const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'person',
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
});
const blog= mongoose.model('Blog', blogSchema);
module.exports=blog;