const mongoose = require('mongoose')
const schema = mongoose.Schema
const model = mongoose.model

const faqSchema = new schema({
    category: {
        type: String
    },
    contents: [{
        image: {
            type: String
        },
        question: {
            type: String
        },
        answer: {
            type: String
        }
    }]
})

module.exports = Faq = model('faq', faqSchema)