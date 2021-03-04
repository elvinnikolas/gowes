import React from 'react'
import { Item, Transition, Grid, Segment, Dropdown, Icon, Divider } from 'semantic-ui-react'

import { ThreadExplore } from '../components/Thread'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery } from '@apollo/react-hooks'
import { GET_POSTS } from '../util/graphql'

const Styles = styled.div`
`

function Home() {
    const { loading, data } = useQuery(GET_POSTS)

    const { getPosts: posts } = data ? data : []

    const communityOptions = [
        {
            key: 0,
            text: 'All communities',
            value: 'all',
        },
        {
            key: 1,
            text: 'Persekutan',
            value: 'Persekutan',
        },
        {
            key: 2,
            text: 'Mantap mantap',
            value: 'Mantap mantap',
        }
    ]

    const filterOptions = [
        {
            key: 0,
            text: 'Most recent',
            value: 'recent',
        },
        {
            key: 1,
            text: 'Most popular',
            value: 'popular',
        },
        {
            key: 1,
            text: 'Most likes',
            value: 'like',
        },
        {
            key: 2,
            text: 'Most comments',
            value: 'comment',
        }
    ]

    return (
        <Styles>
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={14}>
                    <Segment>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column>
                                <Icon name="eye" />
                                <b>&nbsp;Show all threads from&nbsp;&nbsp;</b>
                                <Dropdown
                                    search
                                    selection
                                    options={communityOptions}
                                    defaultValue={communityOptions[0].value}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="filter" />
                                <b>&nbsp;Filter by&nbsp;&nbsp;</b>
                                <Dropdown
                                    selection
                                    options={filterOptions}
                                    defaultValue={filterOptions[0].value}
                                />
                            </Grid.Column>
                        </Grid>
                        <Divider vertical />
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
                                                    posts &&
                                                    posts.map(post => (
                                                        <ThreadExplore key={post._id} post={post} />
                                                    ))
                                                }
                                            </Transition.Group>
                                        )}
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
export default Home