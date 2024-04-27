const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true
    },

    receiver : {
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    message : {
        type: String,
        required: true
    }
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;