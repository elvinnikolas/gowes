
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Dropdown, Header, Icon, Grid, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { CREATE_COMMUNITY } from '../util/graphql'
import { useMutation } from '@apollo/react-hooks'
import { GET_COMMUNITIES } from '../util/graphql'

const Styles = styled.div`
    
`

export function CreateCommunity() {
    const [values, setValues] = useState({
        name: '',
        bio: '',
        city: '',
        province: '',
        isPrivate: '',
    })

    let history = useHistory()

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        createCommunityCallback()
        history.push('/explore-community')
    }

    const [createCommunity, { error }] = useMutation(CREATE_COMMUNITY, {
        variables: values,
        refetchQueries: [{
            query: GET_COMMUNITIES
        }],
        awaitRefetchQueries: true
    })

    function createCommunityCallback() {
        createCommunity()
    }

    const onChangeDropdown = (e, data) => {
        setValues({ ...values, [data.name]: data.value })
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={8}>

                    <Header as='h2' textAlign='center'>
                        <Icon name='group' />
                        Create Community
                    </Header>
                    <br></br>
                    <Form className="form" onSubmit={e => onSubmit(e)}>
                        <Form.Field>
                            <label>Name:</label>
                            <input
                                name='name'
                                placeholder='Community Name'
                                value={values.name}
                                onChange={e => onChange(e)}
                                error={error ? true : false}
                            />
                        </Form.Field>
                        <Form.TextArea
                            name='bio'
                            label='Bio:'
                            placeholder='Community Bio'
                            value={values.bio}
                            onChange={e => onChange(e)}
                            error={error ? true : false}
                        />
                        <Form.Field>
                            <label>City:</label>
                            <input
                                name='city'
                                placeholder='City'
                                value={values.city}
                                onChange={e => onChange(e)}
                                error={error ? true : false}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Province:</label>
                            <input
                                name='province'
                                placeholder='Province'
                                value={values.province}
                                onChange={e => onChange(e)}
                                error={error ? true : false}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Visibility:</label>
                            <Dropdown
                                name='isPrivate'
                                placeholder='Select Visibility'
                                fluid
                                selection
                                onChange={onChangeDropdown}
                                options={
                                    [
                                        {
                                            key: 'private',
                                            text: 'Private',
                                            value: true,
                                        },
                                        {
                                            key: 'public',
                                            text: 'Public',
                                            value: false,
                                        }
                                    ]
                                }
                            />
                        </Form.Field>
                        <br></br>
                        <Button positive type='submit'>Submit</Button>
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