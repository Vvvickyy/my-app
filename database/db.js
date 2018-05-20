var mongoose = require("mongoose"); 

//listen
var db = mongoose.connection;
db.on('error', function callback() { 
    console.log("Connection error");
});
db.once('open', function callback() { 
    //在这里创建你的模式和模型
    console.log('connected!');
});


var TodoSchema = new mongoose.Schema({
    user_id: String, 
    content: String, 
    updated_at: Date 
});

mongoose.model('Todo', TodoSchema); 



mongoose.connect('mongodb://localhost/todo'); 
module.exports = mongoose;


