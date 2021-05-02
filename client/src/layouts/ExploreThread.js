import React, { useContext, useState } from 'react'
import { Item, Transition, Grid, Segment, Dropdown, Icon, Divider } from 'semantic-ui-react'

import { ThreadExplore } from '../components/Thread'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import { AuthContext } from '../context/auth'
import { GET_EXPLORE_POSTS } from '../util/graphql'

const Styles = styled.div`
`

function ExploreThread() {
    const { auth } = useContext(AuthContext)
    const id = auth._id
    const [filterOption, setfilterOption] = useState('popular')

    let { loading, data, refetch } = useQuery(GET_EXPLORE_POSTS, {
        variables: { filter: filterOption }
    })

    const { getExplorePosts: explorePosts } = data ? data : []

    const filterOptions = [
        {
            key: 0,
            text: 'Most popular',
            value: 'popular',
        },
        {
            key: 1,
            text: 'Most recent',
            value: 'recent',
        }
    ]

    const onClickFilter = (e, { value }) => {
        e.persist()
        setfilterOption(value)
        refetch()
    }

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Segment>
                        <Grid relaxed='very' stackable>
                            <Grid.Column>
                                <Icon name="filter" />
                                <b>&nbsp;Sort by&nbsp;&nbsp;</b>
                                <Dropdown
                                    selection
                                    options={filterOptions}
                                    defaultValue={filterOptions[0].value}
                                    onChange={onClickFilter}
                                />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment placeholder>
                        <Grid relaxed='very' stackable>
                            <Grid.Column>

                                <Item.Group divided>
                                    {loading ? (
                                        <Spinner />
                                    ) : (
                                        <Transition.Group>
                                            {
                                                explorePosts &&
                                                explorePosts.map(post => (
                                                    <ThreadExplore key={post._id} post={post} />
                                                ))
                                            }
                                        </Transition.Group>
                                    )
                                    }
                                </Item.Group>

                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        </Styles>
    )
}
export default ExploreThread