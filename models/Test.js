const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    name:{
        type:String        
    },
    duration:{
        type:Number,
        default:0
    },
    timestamp:{
        type:Date,
        default:Date.now()
    },
    questions:[{
        question:String,
        answer:{type:String, default:'None'}
    }]

})

const Test = mongoose.model('Test',TestSchema)
module.exports = Test