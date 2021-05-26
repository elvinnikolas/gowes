import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image, Label, Button } from 'semantic-ui-react'
import styled from 'styled-components'

const Styles = styled.div`
    .link-default {
        color: 'inherit';
        textDecoration: 'inherit';
    }
`

export function CommunityCard({
    community: { _id, name, city, province, image, memberCount },
    guest
}) {
    return (
        <Card>
            <Image
                src={image}
                wrapped
            />
            <Card.Content textAlign='center'>
                <Card.Header>
                    {guest == 'true' ?
                        <Link to={`/community-guest/${_id}`}
                            style={{ color: 'inherit', textDecoration: 'inherit' }}
                        >
                            {name}
                        </Link> :
                        <Link to={`/community/${_id}`}
                            style={{ color: 'inherit', textDecoration: 'inherit' }}
                        >
                            {name}
                        </Link>
                    }
                </Card.Header>
                <Card.Description>
                    <Label size='small'>
                        <Icon name='map marker' />{city}
                    </Label>
                    <Label size='small'>
                        <Icon name='map pin' />{province}
                    </Label>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />{memberCount} {memberCount <= 1 ? "member" : "members"}
            </Card.Content>
        </Card>
    )
}