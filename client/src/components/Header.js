import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Header, Icon, Image, Label, Button, Segment, Confirm } from 'semantic-ui-react'
import styled from 'styled-components'

import {
    FETCH_QUERY_HEADER_COMMUNITY,
    REQUEST_MEMBER,
    JOIN_MEMBER,
    LEAVE_MEMBER,
    GET_COMMUNITIES
} from '../util/graphql'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'

const Styles = styled.div`
`

export function HeaderCommunity({
    details: { _id, name, bio, date, city, province, isPrivate, isActive, memberCount },
    status: { isAdmin, isJoin, isRequest },
    members
}) {

    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = _id

    let history = useHistory()

    const [requestJoinCommunity] = useMutation(REQUEST_MEMBER, {
        variables: { communityId: _id },
        refetchQueries: [{
            query: FETCH_QUERY_HEADER_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [joinCommunity] = useMutation(JOIN_MEMBER, {
        variables: { communityId: communityId },
        refetchQueries: [{
            query: FETCH_QUERY_HEADER_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [leaveCommunity] = useMutation(LEAVE_MEMBER, {
        variables: { communityId: _id },
        refetchQueries: [{
            query: FETCH_QUERY_HEADER_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [leaveAndRemoveCommunity] = useMutation(LEAVE_MEMBER, {
        variables: { communityId: _id },
        update() {
            history.push('/explore-community')
        },
        refetchQueries: [{
            query: GET_COMMUNITIES
        }],
        awaitRefetchQueries: true
    })

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [confirmOpenLeave, setConfirmOpenLeave] = useState(false)

    function onLeaveCommunity() {
        let adminCount = 0
        members.forEach(member => {
            if (member.isAdmin) {
                adminCount++
            }
        })

        if (adminCount > 1) {
            setConfirmOpenLeave(true)
        } else {
            setConfirmOpen(true)
        }
    }

    return (
        <div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='bicycle' circular />
                <Header.Content>{name}</Header.Content>
            </Header>
            <Container textAlign='center'>
                <Label size='medium'>
                    <Icon name='lock' /> {isPrivate ? "Private" : "Public"}
                </Label>
                <Label size='medium'>
                    <Icon name='user' /> {memberCount} {memberCount <= 1 ? "member" : "members"}
                </Label>
                <Label size='medium'>
                    <Icon name='map marker' /> {city}
                </Label>
                <Label size='medium'>
                    <Icon name='map pin' /> {province}
                </Label>
            </Container>
            <br></br>
            <Container text textAlign='center'>
                <p>{bio}</p>

                {isJoin ?
                    memberCount > 1 ?
                        isAdmin ?
                            (
                                <>
                                    <Button negative onClick={onLeaveCommunity}>
                                        Leave
                                    </Button>
                                    <Confirm
                                        content='You must appoint at least one admin before you leave'
                                        confirmButton="OK"
                                        open={confirmOpen}
                                        onCancel={() => setConfirmOpen(false)}
                                        onConfirm={() => setConfirmOpen(false)}
                                    />
                                    <Confirm
                                        content='Are you sure you want to leave this community?'
                                        confirmButton="Leave"
                                        open={confirmOpenLeave}
                                        onCancel={() => setConfirmOpenLeave(false)}
                                        onConfirm={leaveCommunity}
                                    />
                                </>
                            )
                            :
                            (
                                <>
                                    <Button negative onClick={() => setConfirmOpenLeave(true)}>
                                        Leave
                                    </Button>
                                    <Confirm
                                        content='Are you sure you want to leave this community?'
                                        confirmButton="Leave"
                                        open={confirmOpenLeave}
                                        onCancel={() => setConfirmOpenLeave(false)}
                                        onConfirm={leaveCommunity}
                                    />
                                </>
                            )
                        : (
                            <>
                                <Button negative onClick={() => setConfirmOpenLeave(true)}>
                                    Leave
                                </Button>
                                <Confirm
                                    content='Are you sure you want to leave this community?'
                                    confirmButton="Leave"
                                    open={confirmOpenLeave}
                                    onCancel={() => setConfirmOpenLeave(false)}
                                    onConfirm={leaveAndRemoveCommunity}
                                />
                            </>
                        )
                    :
                    isPrivate ?
                        isRequest ?
                            (
                                <Button primary disabled>
                                    Requested
                                </Button>
                            ) : (
                                <Button primary onClick={requestJoinCommunity}>
                                    Request
                                </Button>
                            )
                        :
                        (
                            <Button primary onClick={joinCommunity}>
                                Join
                            </Button>
                        )
                }
            </Container>
        </div>
    )
}