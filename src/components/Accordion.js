// Component, that renders semantic`s accordion component, with props passed from parent
import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

export default class AccordionComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;
		this.setState({ activeIndex: newIndex });
	};

	render() {
		const { activeIndex } = this.state;

		return (
			<Accordion fluid={this.props.fluid} styled>
				<Accordion.Title
					active={activeIndex === 0}
					index={0}
					onClick={this.handleClick}>
					<Icon name="dropdown" />
					{this.props.name}
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
					{this.props.content}
				</Accordion.Content>
			</Accordion>
		);
	}
}

AccordionComponent.propTypes = {
	name: PropTypes.string.isRequired,
	content: PropTypes.node.isRequired,
	fluid: PropTypes.bool
};
