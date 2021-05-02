import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Segment, Card, Ref, Sticky } from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import { Fab, Action } from 'react-tiny-fab';
import styled from 'styled-components'

import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CommunityCard } from '../components/CardList'
import { SidebarExplore } from '../components/Sidebar'

import { useQuery } from '@apollo/client'
import { GET_COMMUNITIES } from '../util/graphql'

const Styles = styled.div`
`

function ExploreCommunity() {

    const contextRef = React.createRef();

    const fab_styles = {
        background: "#007bff"
    }

    const { loading, error, data } = useQuery(GET_COMMUNITIES)

    const { getCommunities: communities } = data ? data : []

    return (
        <Ref innerRef={contextRef}>
            <Styles>
                <Grid columns='equal'>
                    <Grid.Column width={4}>
                        <Sticky context={contextRef} offset={100}>
                            <SidebarExplore />
                        </Sticky>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <Card.Group itemsPerRow={4}>
                                {
                                    communities &&
                                    communities.map(community => (
                                        <CommunityCard key={community._id} community={community} />
                                    ))
                                }
                            </Card.Group>
                        )}
                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                </Grid>

                <Fab
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    mainButtonStyles={fab_styles}
                >
                    <Link to={`/create-community`}>
                        <Action
                            text="Create Community"
                            style={fab_styles}
                        >
                            <FontAwesomeIcon icon={faUsers} />
                        </Action>
                    </Link>
                </Fab>
            </Styles>
        </Ref>
    )
}

export default ExploreCommunity