const mongoose =require("mongoose")
const bcrypt = require("bcrypt")
const { isEmail } = require("validator")

const register_tutor_schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Please enter your first name"],
        maxLength:50,
        minLength:3
    },
    lastname:{
        type:String,
        required:[true,"Please enter your last name"],
        maxLength:50
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        maxLength:50,
        unique:true,
        validate:[isEmail,"Please enter a valid email address"]
    },
    phone:{
        type:Number,
        required:[true,"Please enter your phone number"],
        maxLength:13
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[6,"Password must be at least 6 characters long"],
        maxLength:20
    },
    isAccountVerified: {
        type: String,
        default:"false"
    },
    accountCreated: {
        type: Date,
        default: Date.now
    },
})

register_tutor_schema.pre("save",async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

register_tutor_schema.pre("updateOne",async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

register_tutor_schema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error("incorrect password")
    }
    throw Error("incorrect email")
}

const register_tutor_members =mongoose.model("tutor",register_tutor_schema)
module.exports=register_tutor_members
