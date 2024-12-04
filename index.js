const express = require("express");
const app = express();
require("./config/config");
const userModel = require("./models/user");
const bcrypt = require("bcryptjs");

app.use(express.json());

// app.use("/", (req, res)=>{
//     res.send("<h1>Welcome to my profile❤💖🤣😎</h1>")
//     })
// app.use("/profile", (req, res)=>{
//     res.send("<h1>My name is Khushboo❤💖🤣😎</h1>")
//     })

app.get("/profile", (req, res) => {
  res.send("<h1>My name is khushboo❤💖🤣😎</h1>");
});
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my profile❤💖🤣😎</h1>");
});

/// Signup user/////

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isEmailExist = await userModel.findOne({ email: req.body.email });
    if (isEmailExist) {
      throw new Error("Authentication Error");
    } 
      const hashPassword = await bcrypt.hash(password, 10);

    const userdata = await new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await userdata.save();

    res.status(200).send("user signup successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmailVaild = await userModel.findOne({ email: email });
    if (!isEmailVaild) {
      throw new Error("Enter valid email or password!");
    }

    const isPasswordValid = await bcrypt.compare(password, isEmailVaild.password)
    if(!isPasswordValid){
        throw new Error("Authentiction failed")
    }
    else{
        res.status(200).send("login successfully!");
    }
  

  } catch (err) {
    res.status(400).send(err.message);
  }
});
// get my data
app.get("/my/profile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const profile = await userModel.findById(id);
    res.status(200).json({
      data: profile,
      status: "success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//update my profile
app.patch("/update/profile/:id", async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    const data = req.body;
    const resData = await userModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    res.status(200).json({
      data: resData,
      status: "Success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
app.delete("/delete/profile/:id", async (req, res) => {
  try {
    const resdata = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send("your profile deleted successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen("8081", () => {
  console.log("server is listening sucessfully on port 8081");
});
