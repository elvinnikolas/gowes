const { withFilter } = require('apollo-server')
const Chat = require('../../models/Chat')
const auth = require('../../utils/auth')

module.exports = {
    Query: {
        async getChats(_, { }, context) {
            const payload = auth(context)
            try {
                const chats = await Chat
                    .find({ users: payload._id })
                    .sort({ sent: -1 })
                    .populate('users')
                return chats

            } catch (err) {
                throw new Error(err)
            }
        }
    },

    Mutation: {
        async newChat(_, { to }, context) {
            const payload = auth(context)

            try {
                const newChat = {
                    users: [payload._id, to],
                    lastMessage: '',
                    sent: new Date().toISOString()
                }
                const chat = new Chat(newChat)
                await chat.save()

                context.pubsub.publish('NEW_CHAT', { newChat: chat })

                return chat

            } catch (error) {
                throw new Error(error)
            }
        }
    },
}