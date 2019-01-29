// Clear Button
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearAll } from "../actions/stepActions";

class ClearButton extends Component {
	render() {
		return (
			<Button className="clear" onClick={this.props.clearAll}>
				Clear
			</Button>
		);
	}
}

ClearButton.propTypes = {
	clearAll: PropTypes.func.isRequired
};

export default connect(
	null,
	{ clearAll }
)(ClearButton);
