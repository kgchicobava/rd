// Shows current progress of steps, on top
import React, { Component } from "react";
import { Step } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Steps extends Component {
	checkStage = position => {
		if (position === this.props.step.step) {
			return "active";
		}
		if (position < this.props.step.step) {
			return "completed";
		}
	};
	render() {
		const { step } = this.props.step;
		return (
			<div>
				<Step.Group>
					<Step completed={1 < step} active={step === 1}>
						<Step.Title>
							Discovery Source
							<Step.Description>1</Step.Description>
						</Step.Title>
					</Step>
					<Step completed={2 < step} active={step === 2}>
						<Step.Title>Discovery Options</Step.Title>
						<Step.Description>2</Step.Description>
					</Step>
					<Step completed={3 < step} active={step === 3}>
						<Step.Title>Discovery Input Data</Step.Title>
						<Step.Description>3</Step.Description>
					</Step>
					<Step completed={4 <= step}>
						<Step.Title>Summary</Step.Title>
						<Step.Description>4</Step.Description>
					</Step>
				</Step.Group>
			</div>
		);
	}
}

Steps.propTypes = {
	step: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	step: state.step
});

export default connect(mapStateToProps)(Steps);
