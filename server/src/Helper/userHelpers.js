const bcrypt = require("bcryptjs")



const hashPassword = async(password)=>{
    try {
        let passwordHahed = await bcrypt.hash(password , 8)
        return passwordHahed
    } catch (error) {
     console.log(error);   
    }

};


const comparePassword = async(password, hashPassword)=>{
    try {
        let comparePassword = await bcrypt.compare(password, hashPassword)
        return comparePassword
    } catch (error) {
     console.log(error);   
    }

};

module.exports = {hashPassword, comparePassword}