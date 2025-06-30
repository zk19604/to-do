const mongoose = require('mongoose');
const task_schema = new mongoose.Schema({
    name : String, 
    done : Boolean, 
    userid : String
})

const task = mongoose.model('task', task_schema);
module.exports = task;