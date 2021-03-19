import React, { useContext, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Feed, Image, Icon, Button, Comment, Header, Confirm, Grid, Segment } from 'semantic-ui-react'
import { CommentThread, CreateComment } from '../components/Comment'
import Moment from 'react-moment'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import profileImage from '../assets/profile.jpg'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import {
    GET_POSTS,
    GET_POST,
    LIKE_POST,
    DISLIKE_POST,
    BOOKMARK_POST,
    DELETE_POST
} from '../util/graphql'

const Styles = styled.div`
    .paragraph {
        font-size: 16px;
        white-space: pre-line;
    }
`

export function ThreadDetail(props) {
    const postId = props.match.params.id

    const { loading, data, refetch } = useQuery(GET_POST, {
        variables: { postId }
    })
    const { getPost } = data ? data : []

    const { auth } = useContext(AuthContext)
    let { liked, disliked, bookmarked } = false

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: postId }
    })
    const [dislikePost] = useMutation(DISLIKE_POST, {
        variables: { postId: postId }
    })
    const [bookmarkPost] = useMutation(BOOKMARK_POST, {
        variables: { postId: postId }
    })

    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: GET_POSTS
            })
            proxy.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: data.getPosts.filter(p => p._id !== postId)
                }
            })
            deletePostCallback()
        },
        variables: { postId: postId }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    function deletePostCallback() {
        props.history.push('/')
    }

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        const { _id, user, name, date, title, content, likes, dislikes, comments, bookmarks } = getPost

        return (
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <h1>{title}</h1>

                        <Segment>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image={profileImage} />
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>{name}</Feed.User>
                                        </Feed.Summary>
                                        <Feed.Summary>
                                            <Feed.Date><Moment format='MMMM Do YYYY, h:mm'>{date}</Moment></Feed.Date>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>

                            {!auth.loading && bookmarks.map(bookmark =>
                                bookmark.user === auth._id ?
                                    bookmarked = true : bookmarked
                            )}
                            {bookmarked ?
                                (<Button size='tiny' icon='bookmark' basic color='blue' floated='right'
                                    onClick={bookmarkPost}
                                />) :
                                (<Button size='tiny' icon='bookmark' basic color='white' floated='right'
                                    onClick={bookmarkPost}
                                />)
                            }

                            {auth && auth._id === user && (
                                <>
                                    <Button negative size='tiny' floated='right' icon='trash'
                                        onClick={() => setConfirmOpen(true)}
                                    />
                                    <Confirm
                                        open={confirmOpen}
                                        onCancel={() => setConfirmOpen(false)}
                                        onConfirm={deletePost}
                                    />
                                </>
                            )}

                            <Button.Group>
                                {!auth.loading && likes.map(like =>
                                    like.user === auth._id ?
                                        liked = true : liked
                                )}
                                {liked ?
                                    (<Button size='tiny' basic color='white' onClick={likePost}>
                                        <Icon color='blue' name='thumbs up' /> {likes.length}
                                    </Button>) :
                                    (<Button size='tiny' basic color='white' onClick={likePost}>
                                        <Icon name='thumbs up' /> {likes.length}
                                    </Button>)
                                }
                                {!auth.loading && dislikes.map(dislike =>
                                    dislike.user === auth._id ?
                                        disliked = true : disliked
                                )}
                                {disliked ?
                                    (<Button size='tiny' basic color='white' onClick={dislikePost}>
                                        <Icon color='red' name='thumbs down' /> {dislikes.length}
                                    </Button>) :
                                    (<Button size='tiny' basic color='white' onClick={dislikePost}>
                                        <Icon name='thumbs down' /> {dislikes.length}
                                    </Button>)
                                }
                                <Button size='tiny' basic color='white'>
                                    <Icon name='comment' /> {comments.length}
                                </Button>
                            </Button.Group>
                        </Segment>

                        <br></br>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='large' />

                        <br></br>
                        <p className="paragraph">{content}</p>

                        <br></br>
                        <Comment.Group>
                            <Header as='h3' dividing>
                                Add Comment
                            </Header>
                            <CreateComment postId={_id}></CreateComment>
                        </Comment.Group>
                        <Comment.Group size='large'>
                            <Header as='h3' dividing>
                                Comments
                            </Header>
                            {comments.map(comment => (
                                <CommentThread
                                    key={comment._id}
                                    comment={comment}
                                    userId={auth._id}
                                    postId={_id}
                                    refetch={refetch}
                                />
                            ))}
                        </Comment.Group>

                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>
            </Styles >
        )
    }
}