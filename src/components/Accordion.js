import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class AccordionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion fluid={this.props.fluid} styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          {this.props.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {this.props.content}
        </Accordion.Content>
      </Accordion>
    )
  }
}