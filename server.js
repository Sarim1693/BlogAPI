const express=require('express');
require('dotenv').config();
const app=express();
const bodyParser=require('body-parser');
const db=require('./db');
const PORT=process.env.PORT||3000;
const Person=require('./models/Person');
const Blog=require('./models/Blog');
app.use(bodyParser.json());
const personroutes=require('./routes/personroutes');
app.use('/person', personroutes);
const blogRoutes=require('./routes/blogRoutes');
app.use('/blog', blogRoutes);
app.listen(PORT, ()=>{
    console.log(`Server is Running at ${PORT}`);
});
