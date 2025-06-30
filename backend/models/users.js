const mongoose = require('mongoose');
const users_schema = new mongoose.Schema({
    name : String, 
    age : Number, 
    username : String, 
    email : String, 
    password : String
})

const users= mongoose.model('users', users_schema);
module.exports = users;