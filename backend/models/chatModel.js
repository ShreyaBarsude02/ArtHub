const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema ({
    participants : [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
    ],
    messages : [
        {
            type: Schema.Types.ObjectId,
            ref:'Message',
            default: []
        }
    ]
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;