const express = require('express');
const app = express();
const Path = require('path');

const usermodel = require("./models/user");

app.set("view engine", "ejs");
//body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(Path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("index");
});

app.get('/read', async (req,res) =>{
 let users = await usermodel.find();
 res.render('read',{users});
});

app.post('/create',async (req,res) =>{
    let {username ,email , image} = req.body; //distructring
    let createduser = await usermodel.create({
        username,
        email,
        image
    });
    res.redirect('read');
});

//delete users
app.get('/delete/:id', async (req,res) =>{
 await usermodel.findOneAndDelete({_id: req.params.id });
 res.redirect('/read');
});

// Edit User
app.get('/edit/:userid', async(req,res)=>{
 let user = await usermodel.findOne({_id : req.params.userid});
 res.render('edit',{user});
});

app.post('/update/:userid',async(req,res)=>{
    let{image,username,email} = req.body;
    let user = await usermodel.findOneAndUpdate({_id:req.params.userid},{image,username,email},{new : true});
   res.redirect('/read')
})

app.listen(3000);