const mongoose = require('mongoose');

const contest= new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Contest:{
        type:String,
        required:true
    },
    Testcase:{
        type:[String],
        required:true
    },
});

module.exports=mongoose.model('ContestProblem',contest);