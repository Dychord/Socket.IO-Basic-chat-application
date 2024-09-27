const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/chatApp', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
});


const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Chat", chatSchema);
