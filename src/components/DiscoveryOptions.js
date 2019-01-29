// Component that renders 4 checkboxes, only first triggers next section
import React, { Component } from "react";
import Accordion from "./Accordion";
import { Checkbox, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { nextStep, previousStep } from "../actions/stepActions";

class DiscoveryOptions extends Component {
	onCheckboxToggle = () => {
		if (document.querySelector("#snmp").checked) {
			this.props.nextStep(3);
		} else {
			this.props.previousStep(2);
		}
	};

	Content = () => (
		<div>
			<Form>
				<Form.Field>
					<Checkbox
						label="SNMP"
						name="snmp"
						id="snmp"
						onChange={this.onCheckboxToggle}
					/>
				</Form.Field>
				<Form.Field>
					<Checkbox label="Link" />
				</Form.Field>
				<Form.Field>
					<Checkbox label="VLAN" />
				</Form.Field>
				<Form.Field>
					<Checkbox label="PORTS" />
				</Form.Field>
			</Form>
		</div>
	);

	render() {
		return (
			<div className="discovery-options">
				{this.props.step.step < 2 ? (
					""
				) : (
					<Accordion
						name="Discovery options"
						content={this.Content()}
					/>
				)}
			</div>
		);
	}
}

DiscoveryOptions.propTypes = {
	step: PropTypes.object.isRequired,
	nextStep: PropTypes.func.isRequired,
	previousStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	step: state.step
});

export default connect(
	mapStateToProps,
	{ nextStep, previousStep }
)(DiscoveryOptions);
