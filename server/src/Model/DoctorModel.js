const mongoose = require("mongoose");



const doctorSchema = mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    specialization:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    },
    feesPerConsaltation:{
        type:Number,
        require:true
    },
    status:{
       type : String,
       default: "pending"
    },
    timings:{
        type:Object,
        require:true
    },
},{timestamps:true});

const doctorModel = mongoose.model("doctorModel", doctorSchema);


module.exports = doctorModel