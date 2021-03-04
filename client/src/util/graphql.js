import gql from 'graphql-tag'

//POST
export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            user
            name
            date
            title
            content
            likes{
                _id
                user
            }
            dislikes{
                _id
                user
            }
            bookmarks{
                _id
                user
                date
            }
            comments{
                _id
                user
                comment
            }
            community {
                _id
                name
            }
        }
    }
`

export const GET_BOOKMARK_POSTS = gql`
  query {
      getBookmarkPosts {
            _id
            user
            name
            title
            date
            content
            likes {
                _id
                user
            }
            comments {
                _id
                user
                name
                date
                comment
            }
            dislikes {
                _id
                user
            }
            bookmarks {
                _id
                user
                date
            }
            community {
                _id
                name
            }
      }
  }
`

export const LIKE_POST = gql`
  mutation likePost(
      $postId: ID!
    ) {
        likePost(postId: $postId) {
            _id
            likes {
                _id
                user
            }
            dislikes {
                _id
                user
            }
        }
    }
`

export const DISLIKE_POST = gql`
  mutation dislikePost(
      $postId: ID!
    ) {
        dislikePost(postId: $postId) {
            _id
            likes {
                _id
                user
            }
            dislikes {
                _id
                user
            }
        }
    }
`

export const BOOKMARK_POST = gql`
  mutation bookmarkPost(
      $postId: ID!
    ) {
        bookmarkPost(postId: $postId) {
            _id
            user
            name
            title
            date
            content
            likes {
                _id
                user
            }
            comments {
                _id
                user
                name
                date
                comment
            }
            dislikes {
                _id
                user
            }
            bookmarks {
                _id
                user
                date
            }
        }
    }
`

export const DELETE_POST = gql`
  mutation deletePost(
      $postId: ID!
    ) {
        deletePost(postId: $postId)
    }
`
