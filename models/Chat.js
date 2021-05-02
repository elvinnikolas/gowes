const mongoose = require('mongoose')
const schema = mongoose.Schema
const model = mongoose.model

const chatSchema = new schema({
    users: [{
        type: schema.Types.ObjectId,
        ref: 'user'
    }],
    lastMessage: {
        type: String
    },
    sent: {
        type: String
    }
})

module.exports = Chat = model('chat', chatSchema)