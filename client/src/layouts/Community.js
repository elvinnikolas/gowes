import React, { createRef, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Ref, Grid, Sticky } from 'semantic-ui-react'

import { HeaderCommunity } from '../components/Header'
import { MenuCommunity } from '../components/Menu'
import Spinner from '../components/Spinner'
import { Fab, Action } from 'react-tiny-fab';

import { faPlus, faStream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FETCH_QUERY_COMMUNITY } from '../util/graphql'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'

export function Community(props) {
    const contextRef = React.createRef();

    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = props.match.params.id

    const { loading, data, refetch } = useQuery(FETCH_QUERY_COMMUNITY, {
        variables: { userId, communityId }
    })
    const {
        getCommunity: details,
        getMemberStatus: status,
        getCommunityPosts: posts,
        getCommunityMembers: members,
        getCommunityMemberRequests: requests
    } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {

        return (
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={14}>

                    <Ref innerRef={contextRef}>
                        <Container>
                            <HeaderCommunity
                                details={details}
                                status={status}
                                members={members}
                                posts={posts}
                            />
                            <br></br>
                            <MenuCommunity
                                details={details}
                                status={status}
                                posts={posts}
                                members={members}
                                requests={requests}
                                refetch={refetch}
                                contextref={contextRef}
                            />

                            <Fab
                                icon={<FontAwesomeIcon icon={faPlus} />}
                                mainButtonStyles={fab_styles}
                            >
                                <Link to={`/create-thread/${communityId}`}>
                                    <Action
                                        text="Create Thread"
                                        style={fab_styles}
                                    >
                                        <FontAwesomeIcon icon={faStream} />
                                    </Action>
                                </Link>
                            </Fab>
                        </Container>
                    </Ref>

                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
            </Grid>
        )
    }
}

const fab_styles = {
    background: "#007bff"
}