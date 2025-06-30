// //require express
// const express = require('express');
// const app = express();

// // initilize port
// const port = 3000;
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// // requre or we can say import mongoose module
// const usermodel = require('./usermodel');

// //making rout and check crud operation is working or not
// app.get('/create', async (req,res)=>{
//     let createuser = await usermodel.create({
//         name:"Rahul",           
//         username : "rahulpandey314",
//         email : "rahulpandeyr184@gmail.com"
//     })
//     res.send(createuser);
// })

// // update
// app.get('/update', async(req,res)=>{
//     let userupdate = await usermodel.findOneAndUpdate(
//         {username : "rahulpandey314"},
//         {name : "Rahul Pandey"},
//         {new : true}
//     )
//     res.send(userupdate)
// })

// // read operation

// app.get("/Read", async (req,res)=>{
//     let readuser = await usermodel.find();
//     //let readuser = await usermodel.findOne({ name : "Rahul" }); only one read operation ke liye find(Name parameter paas kar denge )
//     res.send(readuser);
// })

// // delaete operation
// app.get("/delete",async(req,res)=>{
//     let user = await usermodel.findOneAndDelete({name : "Rahul"});
//     res.send(user)
// })

// // listining port
// app.listen(port,()=>{
//     console.log(`app is listing on port ${port}`);
// })
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port = 3000;
const usermodel = require('./usermodel');

app.get('/create',async(req,res)=>{
let createuser = await usermodel.create({
    name : "Rahul",
    email:"abc@gmail.com"
})
res.send(createuser);
});

// for reading 
app.get('/read' ,async (req,res)=>{
    let readuser = await usermodel.find();
    res.send(readuser);
})
// for update
app.get('/update',async (req,res)=>{
    let updateduser = await usermodel.findOneAndUpdate(
        {name:"Rahul"},{name:"abc@gmail.com"},{new : true}
    )
    res.send(updateduser);
})
 // for deleting
 app.get('/delete',async (req,res)=>{
    let deleteduser = await usermodel.findOneAndDelete(
        {name:'abc@gmail.com'}
    )
    res.send(deleteduser);
 })

app.listen(port,()=>{
    console.log(`app is listining on port ${port}` );
});