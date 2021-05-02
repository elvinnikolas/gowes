import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
    Tab,
    Input,
    Menu,
    Segment,
    Sticky,
    Item,
    Header,
    Icon,
    Button,
    Transition,
    Label,
    Card,
    Ref,
    Image,
    Dropdown
} from 'semantic-ui-react'
import styled from 'styled-components'

import { Thread } from './Thread'
import profileImage from '../assets/profile.jpg'

import {
    FETCH_QUERY_MENU_COMMUNITY,
    REQUEST_MEMBER,
    JOIN_MEMBER,
    ACCEPT_MEMBER,
    REJECT_MEMBER,
    APPOINT_ADMIN,
    REMOVE_MEMBER
} from '../util/graphql'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'

const Styles = styled.div`
`

export function MenuCommunity({
    details: { _id, isPrivate },
    status: { isJoin, isAdmin, isRequest },
    posts,
    members,
    requests,
    refetch,
    contextref
}) {
    const { auth } = useContext(AuthContext)
    const userId = auth._id
    const communityId = _id

    const [requestJoinCommunity] = useMutation(REQUEST_MEMBER, {
        variables: { communityId: _id },
        refetchQueries: [{
            query: FETCH_QUERY_MENU_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [joinCommunity] = useMutation(JOIN_MEMBER, {
        variables: { communityId: communityId },
        refetchQueries: [{
            query: FETCH_QUERY_MENU_COMMUNITY,
            variables: { userId: userId, communityId: communityId }
        }],
        awaitRefetchQueries: true
    })

    const [acceptMember] = useMutation(ACCEPT_MEMBER, {
        update() {
            refetch()
        }
    })

    const [rejectMember] = useMutation(REJECT_MEMBER, {
        update() {
            refetch()
        }
    })

    const [appointAdmin] = useMutation(APPOINT_ADMIN, {
        update() {
            refetch()
        }
    })

    const [removeMember] = useMutation(REMOVE_MEMBER, {
        update() {
            refetch()
        }
    })

    return (
        <div>
            {/* <Sticky context={contextref}> */}

            <Tab
                panes={[
                    {
                        menuItem: 'Thread',
                        render: () =>
                            isJoin ?
                                posts.length > 0 ?
                                    (
                                        <Segment attached='bottom'>
                                            <Item.Group divided>
                                                <Transition.Group>
                                                    {
                                                        posts &&
                                                        posts.map(post => (
                                                            <Thread key={post._id} post={post} />
                                                        ))
                                                    }
                                                </Transition.Group>
                                            </Item.Group>
                                        </Segment>
                                    ) : (
                                        <Segment placeholder>
                                            <Header icon>
                                                <Icon name='edit' />
                                                No threads posted here yet
                                                <br></br><br></br>
                                                <Link to={`/create-thread/${communityId}`}>
                                                    <Button primary>
                                                        Create Thread
                                                    </Button>
                                                </Link>
                                            </Header>
                                        </Segment>
                                    )
                                : (
                                    <Segment placeholder>
                                        <Header icon>
                                            <Icon name='lock' />
                                            Join the group to see and post threads in this group
                                        </Header>
                                        {
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
                                    </Segment>
                                )
                    },

                    {
                        menuItem: 'Member',
                        render: () =>
                            <Segment attached='bottom'>
                                <Item.Group divided link>
                                    {
                                        members &&
                                        members.map(member => (
                                            <Item>
                                                <Item.Image size='tiny' src={profileImage} />

                                                <Item.Content>
                                                    <Link
                                                        to={`/profile/${member.user._id}`}
                                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                    >
                                                        <Item.Header><b>{member.user.name}</b></Item.Header>
                                                    </Link>
                                                    <Item.Description>{member.user.bio}</Item.Description>
                                                    {member.isAdmin ?
                                                        (
                                                            <Item.Description>
                                                                <Label basic tiny color='blue'>
                                                                    admin
                                                                </Label>
                                                            </Item.Description>
                                                        ) : []
                                                    }
                                                    {isAdmin ?
                                                        member.user._id !== userId ?
                                                            member.isAdmin ?
                                                                (
                                                                    <Item.Extra>
                                                                        <Button.Group floated='right' color='teal'>
                                                                            <Button color='teal'>Action</Button>
                                                                            <Dropdown floating className='button icon'>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item
                                                                                        text='Kick'
                                                                                        onClick={() =>
                                                                                            removeMember({
                                                                                                variables: {
                                                                                                    communityId: communityId,
                                                                                                    userId: member.user._id
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
                                                                        </Button.Group>
                                                                    </Item.Extra>
                                                                ) : (
                                                                    <Item.Extra>
                                                                        <Button.Group floated='right' color='teal'>
                                                                            <Button color='teal'>Action</Button>
                                                                            <Dropdown floating className='button icon'>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item
                                                                                        text='Appoint admin'
                                                                                        onClick={() =>
                                                                                            appointAdmin({
                                                                                                variables: {
                                                                                                    communityId: communityId,
                                                                                                    userId: member.user._id
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                    <Dropdown.Item
                                                                                        text='Kick'
                                                                                        onClick={() =>
                                                                                            removeMember({
                                                                                                variables: {
                                                                                                    communityId: communityId,
                                                                                                    userId: member.user._id
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    />
                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
                                                                        </Button.Group>
                                                                    </Item.Extra>
                                                                ) : []
                                                        : []
                                                    }
                                                </Item.Content>
                                            </Item>
                                        ))
                                    }
                                </Item.Group>
                            </Segment>
                    },

                    isAdmin && isPrivate ?
                        {
                            menuItem: (
                                <Menu.Item>
                                    Member Request
                                    {requests.length > 0 ? (
                                        <Label color='blue' floating>
                                            {requests.length}
                                        </Label>
                                    ) : []
                                    }
                                </Menu.Item>
                            ),
                            render: () =>
                                requests &&
                                    requests.length > 0 ?
                                    (
                                        <Segment attached='bottom'>
                                            <Card.Group divided link>
                                                {
                                                    requests.map(request => (
                                                        <Card fluid>
                                                            <Card.Content>
                                                                <Image
                                                                    floated='left'
                                                                    size='mini'
                                                                    src={profileImage}
                                                                />
                                                                <Card.Header>
                                                                    <Link
                                                                        to={`/profile/${request.user._id}`}
                                                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                                    >
                                                                        <b>{request.user.name}</b>
                                                                    </Link>
                                                                </Card.Header>
                                                                <Card.Meta>{request.user.bio}</Card.Meta>
                                                                <Card.Description>
                                                                    <p>
                                                                        Let me innnn
                                                                    </p>
                                                                </Card.Description>
                                                            </Card.Content>
                                                            <Card.Content extra>
                                                                <div>
                                                                    <Button color='green' onClick={() =>
                                                                        acceptMember({
                                                                            variables: {
                                                                                communityId: communityId,
                                                                                userId: request.user._id
                                                                            }
                                                                        })
                                                                    }>
                                                                        Accept
                                                                    </Button>
                                                                    <Button color='red' onClick={() =>
                                                                        rejectMember({
                                                                            variables: {
                                                                                communityId: communityId,
                                                                                userId: request.user._id
                                                                            }
                                                                        })
                                                                    }>
                                                                        Reject
                                                                    </Button>
                                                                </div>
                                                            </Card.Content>
                                                        </Card>
                                                    ))

                                                }
                                            </Card.Group>
                                        </Segment>
                                    ) : (
                                        <Segment placeholder>
                                            <Header icon>
                                                <Icon name='user x' />
                                                No new members request
                                            </Header>
                                        </Segment>
                                    )
                        }
                        :
                        {}
                ]}
            />
            {/* </Sticky> */}
        </div>
    )
}