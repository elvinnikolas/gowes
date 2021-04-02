const Faq = require('../../models/Faq')

module.exports = {
    Query: {
        async getFaqs() {
            try {
                const faqs = await Faq.find()
                return faqs

            } catch (error) {
                throw new Error(error)
            }
        }
    }
}