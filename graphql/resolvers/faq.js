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
        },

        async getFaqCategories() {
            try {
                const faqs = await Faq.find()
                return faqs

            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        async addFaqCategory(_, { category }) {

            if (category.trim() == '') {
                throw new Error('Category cannot be empty')
            }

            try {
                const newFaq = {
                    category: category,
                    contents: []
                }

                const faq = new Faq(newFaq)
                await faq.save()

                return faq

            } catch (error) {
                throw new Error(error)
            }
        },

        async addFaq(_, { category, question, answer }) {

            if ((question.trim() == '') || (answer.trim() == '')) {
                throw new Error('All field must be filled')
            }

            try {
                const faq = await Faq.findOne({ category: category })

                if (faq) {
                    faq.contents.push({ question: question, answer: answer })
                } else {
                    throw new Error('Invalid category')
                }

                await faq.save()

                return faq

            } catch (error) {
                throw new Error(error)
            }
        },

        async removeFaq(_, { faqId }) {

            try {
                const faq = await Faq.findById(faqId)

                if (faq) {
                    await faq.remove()
                    return 'FAQ deleted successfully'

                } else {
                    throw new Error('Invalid FAQ')
                }

            } catch (error) {
                throw new Error(error)
            }
        }
    }
}