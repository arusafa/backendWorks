const mongoose =require("mongoose")

const register_schema = new mongoose.Schema({

    firstname:{
        type:String,
        require:true,
        maxLength:50,
        minLength:3
    },
    lastname:{
        type:String,
        require:true,
        maxLength:50
    },
    email:{
        type:String,
        require:true,
        maxLength:50
    },
    phone:{
        type:Number,
        require:true,
        maxLength:13
    },
    password:{
        type:String,
        require:true,
        minLength:5,
        maxLength:20
    },
    isAccountVerified: {
        
        type: String,
        default:"true"
    },
    accountCreated: {
        type: Date,
        default: Date.now
    }
    
    
})

const register_members =mongoose.model("register",register_schema)
module.exports=register_members
