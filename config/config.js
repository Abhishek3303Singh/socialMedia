const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://abhishek50503:Aksingh%4050503@testingmongocloud.fiddxnz.mongodb.net/socialMedia")
}

module.exports=connectDb().then(()=>{
    console.log("Db connection successfully")
}).catch((err)=>{
    console.log("Db connection failed!")
}
)
