const mongoose = require('mongoose')


const userSchema =  mongoose.Schema({
name:{
    type:String,
    require:true,
},
email:{
    type:String,
    require:true
},
securityAns:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
},
isAdmin:{
    type:Boolean,
    default:false
},
isDoctor:{
    type:Boolean,
    default:false
},
notification:{
    type:Array,
    default:[]
},
seenNotification:{
    type:Array,
    default:[]
}
});

const userData = mongoose.model("userData", userSchema)

module.exports = userData