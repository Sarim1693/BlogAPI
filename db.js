const mongoose=require('mongoose');
const mongoUrl= process.env.MONGO_URL;
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('connected', ()=>{
    console.log('Database Connected');
});
db.on('disconnected', ()=>{
    console.log('Database Disconnected');
});
db.on('error', (err)=>{
    console.log('Error in Database Occured ', err);
});
module.exports=db;