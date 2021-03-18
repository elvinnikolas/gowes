
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Grid, Header, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

import { AuthContext } from '../context/auth'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../util/hooks'
import { CREATE_POST, FETCH_QUERY_COMMUNITY } from '../util/graphql'

const Styles = styled.div`
    
`

export function CreateThread(props) {

    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = props.match.params.id

    const [values, setValues] = useState({
        title: '',
        content: ''
    })

    let history = useHistory()

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        createPostCallback()
        history.push(`/community/${communityId}`)
    }

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: { title: values.title, content: values.content, communityId: communityId },
        refetchQueries: [{
            query: FETCH_QUERY_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={8}>

                    <Header as='h2' textAlign='center'>
                        <Icon name='group' />
                        Create New Thread
                    </Header>
                    <br></br>
                    <Form className="form" onSubmit={e => onSubmit(e)}>
                        <Form.Field>
                            <label>Title:</label>
                            <input
                                name='title'
                                placeholder='Thread title'
                                value={values.title}
                                onChange={e => onChange(e)}
                                error={error ? true : false}
                            />
                        </Form.Field>
                        <Form.TextArea
                            name='content'
                            label='Content:'
                            placeholder='Thread content'
                            value={values.content}
                            onChange={e => onChange(e)}
                            error={error ? true : false}
                        />
                        <Button positive type='submit'>Submit</Button>
                        <Button negative type='button' onClick={() => history.goBack()}>Back</Button>
                    </Form>

                    {error && (
                        <div className="ui error message">
                            <div className="list">
                                <li>{error.graphQLErrors[0].message}</li>
                            </div>
                        </div>
                    )}
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Styles>
    )
}

// export default CreateThread