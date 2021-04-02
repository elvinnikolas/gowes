const postResolvers = require('./post')
const userResolvers = require('./user')
const communityResolvers = require('./community')
const faqResolvers = require('./faq')

module.exports = {
    // Post: {
    //     likesCount: (parent) => parent.likes.length,
    //     dislikesCount: (parent) => parent.dislikes.length,
    //     commentsCount: (parent) => parent.comments.length
    // },

    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query,
        ...communityResolvers.Query,
        ...faqResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...communityResolvers.Mutation
    }
}