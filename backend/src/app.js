const express=require("express");
const app=express();
const path=require("path");
const port=process.env.PORT || 3000;
const hbs=require("hbs");
require("./db/conn");
const Register=require("./models/registers");
const static_path=path.join(__dirname,"../public");
const views_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);
app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/login', (req, res) => {
    res.render("login");
  });
  app.get('/about', (req, res) => {
    res.render("about");
  });
app.get('/register', (req, res) => {
    res.render("register");
});
app.get('/login', (req, res) => {
  res.render("login");
});
app.post('/register', async (req, res) => {
  try{
    const email=req.body.email;
    const phone=req.body.phone_number;
    const password=req.body.password;
    const confirm_password=req.body.confirm_password;

    if (!email) {
      res.status(400).send("Email is required.");
      return;
    }

    if(password!==confirm_password){
      res.status(400).send("Passwords do not match.");
      return;
    }

    const existingUser = await Register.findOne({ email: email });
    if (existingUser) {
      res.status(400).send("User with this email already exists.");
      return;
    }

    const newRegister=new Register({
      email: email,
      phone_number: phone,
      password: password,
      confirm_password: confirm_password
    });

    const registered=await newRegister.save();
    res.status(201).render("index");

  }
  catch(error){
    res.status(400).send(error);
  }
});
app.post('/login', async(req, res) => {
  try{
    const email=req.body.email;
    const password=req.body.password;
    const useremail=await Register.findOne({email:email});
    if(useremail.password===password)
    {
      res.status(201).render("index");
    }
    else
    {
      res.send("invalid login details");
    }

  }
  catch(error){
    res.status(400).send("invalid login details");
  }
});
app.get('/contact', (req, res) => {
  res.render("contact");
});
app.get('/work', (req, res) => {
  res.render("work");
});
    

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});
