import React, { useState } from 'react'
import { Comment, Button, Form, Confirm } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import profile from '../assets/profile.jpg'

import { DELETE_COMMENT, ADD_COMMENT } from '../util/graphql'
import { useMutation } from '@apollo/react-hooks'

const Styles = styled.div`

`

export const CommentThread = ({ postId, userId, comment, refetch }) => {

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        variables: { postId, commentId: comment._id },
        update() {
            refetch()
        }
    })

    const [confirmOpen, setConfirmOpen] = useState(false)

    return comment === null ? (
        <Spinner />
    ) : (
        <Comment>
            <Comment.Avatar src={profile} />
            <Comment.Content>
                <Comment.Author as='a'>{comment.name}</Comment.Author>
                <Comment.Metadata>
                    <span>{moment(comment.date).fromNow()}</span>
                </Comment.Metadata>
                <Comment.Text>{comment.comment}</Comment.Text>
                <Comment.Actions>
                    {comment.user === userId && (
                        <Comment.Action>
                            <Button
                                size='mini'
                                icon='trash'
                                negative
                                onClick={() => setConfirmOpen(true)}
                            />
                            <Confirm
                                content='Are you sure to delete this comment?'
                                cancelButton='NO'
                                confirmButton="YES"
                                open={confirmOpen}
                                onCancel={() => setConfirmOpen(false)}
                                onConfirm={deleteComment}
                            />
                        </Comment.Action>
                    )}
                </Comment.Actions>
            </Comment.Content>
        </Comment >
    )
}

export const CreateComment = ({ postId }) => {
    const [comment, setComment] = useState('')

    const [addComment] = useMutation(ADD_COMMENT, {
        update() {
            setComment('')
        },
        variables: { postId, comment }
    })

    return (
        <Styles>
            <Form reply onSubmit={addComment}>
                <Form.TextArea
                    rows={2}
                    name='comment'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button
                    content='Submit'
                    disabled={comment.trim() == ''}
                    labelPosition='left'
                    icon='pencil'
                    primary
                />
            </Form>
        </Styles>
    )
}