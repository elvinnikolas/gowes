import React from 'react'
import { Grid, Tab, Accordion, Icon, Header, Message, Segment, Menu, Ref, Sticky } from 'semantic-ui-react'
import _ from 'lodash'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import { GET_FAQS } from '../util/graphql'

const Styles = styled.div`
  .content-text {
    font-family: 'Roboto', cursive;
    font-size: 15px;
  }

  .paragraph {
    font-size: 14px;
    white-space: pre-line;
  }
`;

export default function Faq() {
    const contextRef = React.createRef()

    const { loading, data } = useQuery(GET_FAQS)

    const { getFaqs: faqs } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <Ref innerRef={contextRef}>
                <Styles>
                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>

                        <Grid.Column width={14}>
                            <Header as='h2' textAlign='center'>
                                <Icon name='question circle' />
                            Frequently Asked Questions
                        </Header>
                            <br></br>

                            <Tab
                                menu={(
                                    <Menu as={Sticky} context={contextRef} offset={100} vertical tabular></Menu>
                                )}
                                panes={
                                    faqs.map(faq => (
                                        {
                                            menuItem: faq.category,
                                            render: () => (
                                                <Accordion
                                                    className="content-text"
                                                    panels={
                                                        faq.contents.map(content => (
                                                            {
                                                                key: content._id,
                                                                title: content.question,
                                                                content: {
                                                                    content: (
                                                                        <Message className="paragraph"
                                                                            content={content.answer}
                                                                        />
                                                                    ),
                                                                }
                                                            }
                                                        ))
                                                    }
                                                    exclusive={false}
                                                    fluid
                                                    styled
                                                />
                                            )
                                        }
                                    ))
                                }
                            />
                        </Grid.Column>

                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Styles>
            </Ref>
        )
    }
}