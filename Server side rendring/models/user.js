const mongoose  = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testdb');
const userSchema = mongoose.Schema(
    {
        image : String, 
        username:String,
        email:String
    }
);
module.exports = mongoose.model('user',userSchema);