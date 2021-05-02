import React from 'react'
import { Grid, Tab, Accordion, Icon, Header, Segment } from 'semantic-ui-react'
import _ from 'lodash'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import { GET_FAQS } from '../util/graphql'

const Styles = styled.div`
.content-text {
    font-family: 'Roboto', cursive;
    font-size: 13px;
  }
`;

export default function Faq() {
    const { loading, data } = useQuery(GET_FAQS)

    const { getFaqs: faqs } = data ? data : []

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        return (
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
                            menu={{ fluid: true, vertical: true, pointing: true }}
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
                                                            content: content.answer
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
        )
    }
}

// import React, { Component } from 'react'
// import { Grid, Menu, Accordion, Icon, Header } from 'semantic-ui-react'

// export default class Faq extends Component {
//     state = { activeItem: 'dog', activeIndex: 0 }

//     handleClick = (e, titleProps) => {
//         const { index } = titleProps
//         const { activeIndex } = this.state
//         const newIndex = activeIndex === index ? -1 : index

//         this.setState({ activeIndex: newIndex })
//     }

//     handleItemClick = (e, { name }) => {
//         this.setState({ activeItem: name })
//     }

//     render() {
//         const { activeItem, activeIndex } = this.state

//         return (
//             <Grid>
//                 <Grid.Column width={4}>
//                     <Menu fluid vertical pointing>
//                         <Menu.Item header>
//                             <Header textAlign='center'>Topics</Header>
//                         </Menu.Item>
//                         <Menu.Item
//                             name='dog'
//                             active={activeItem === 'dog'}
//                             onClick={this.handleItemClick}
//                         />
//                         <Menu.Item
//                             name='pics'
//                             active={activeItem === 'pics'}
//                             onClick={this.handleItemClick}
//                         />
//                         <Menu.Item
//                             name='companies'
//                             active={activeItem === 'companies'}
//                             onClick={this.handleItemClick}
//                         />
//                         <Menu.Item
//                             name='links'
//                             active={activeItem === 'links'}
//                             onClick={this.handleItemClick}
//                         />
//                     </Menu>
//                 </Grid.Column>

//                 <Grid.Column width={12}>
//                     <Accordion fluid styled>
//                         <Accordion.Title
//                             active={activeIndex === 0}
//                             index={0}
//                             onClick={this.handleClick}
//                         >
//                             <Icon name='dropdown' />
//               What is a dog?
//             </Accordion.Title>
//                         <Accordion.Content active={activeIndex === 0}>
//                             <p>
//                                 A dog is a type of domesticated animal. Known for its loyalty
//                                 and faithfulness, it can be found as a welcome guest in many
//                                 households across the world.
//               </p>
//                         </Accordion.Content>
//                         <Accordion.Title
//                             active={activeIndex === 1}
//                             index={1}
//                             onClick={this.handleClick}
//                         >
//                             <Icon name='dropdown' />
//               What kinds of dogs are there?
//             </Accordion.Title>
//                         <Accordion.Content active={activeIndex === 1}>
//                             <p>
//                                 There are many breeds of dogs. Each breed varies in size and
//                                 temperament. Owners often select a breed of dog that they find
//                                 to be compatible with their own lifestyle and desires from a
//                                 companion.
//               </p>
//                         </Accordion.Content>

//                         <Accordion.Title
//                             active={activeIndex === 2}
//                             index={2}
//                             onClick={this.handleClick}
//                         >
//                             <Icon name='dropdown' />
//               How do you acquire a dog?
//             </Accordion.Title>
//                         <Accordion.Content active={activeIndex === 2}>
//                             <p>
//                                 Three common ways for a prospective owner to acquire a dog is
//                                 from pet shops, private owners, or shelters.
//               </p>
//                             <p>
//                                 A pet shop may be the most convenient way to buy a dog. Buying a
//                                 dog from a private owner allows you to assess the pedigree and
//                                 upbringing of your dog before choosing to take it home. Lastly,
//                                 finding your dog from a shelter, helps give a good home to a dog
//                                 who may not find one so readily.
//               </p>
//                         </Accordion.Content>
//                     </Accordion>
//                 </Grid.Column>
//             </Grid>
//         )
//     }
// }
