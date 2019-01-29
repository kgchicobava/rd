// Shows select of snmp ver, triggers after discovery options component
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Radio, Input, Button, Modal } from "semantic-ui-react";
import Accordion from "./Accordion";
import PropTypes from "prop-types";
import ClearButton from "./ClearButton";
import SNMPdetails from "./SNMPdetails";
import { sendError, clearErrors } from "../actions/sourceActions";
import {
	setSNMPver,
	setOptions,
	setReadCommunity
} from "../actions/selectedOptsActions";
import omitEmpty from "omit-empty";
import { nextStep } from "../actions/stepActions";

class SelectedOptions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			readCommunity: ""
		};
		this.changeVersion = this.changeVersion.bind(this);
		this.onReadCommunity = this.onReadCommunity.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.config = this.config.bind(this);
		this.confirm = this.confirm.bind(this);
	}

	closeModal = () => this.setState({ modal: false });

	ModalBox = config => (
		<Modal onClose={this.closeModal} open={this.state.modal}>
			<pre>{`${JSON.stringify(config, null, 2)}`}</pre>
			<Button className="close-modal" onClick={this.closeModal}>
				Close
			</Button>
		</Modal>
	);

	// Config that shows in modal after button "discover"
	config = () => {
		const { selectedOpts, source } = this.props;
		let sourceData = omitEmpty(source);
		return {
			content: {
				...sourceData,
				snmpConfig: {
					version: selectedOpts.SNMPver,
					snmpv1: selectedOpts.snmpv1,
					snmpv2: selectedOpts.snmpv2,
					snmpv3: selectedOpts.snmpv3
				}
			}
		};
	};

	// if snmp ver 1 or 2, will read read community field
	onReadCommunity = ev => {
		this.setState({ readCommunity: ev.target.value });
	};

	changeVersion = (ev, { value }) => {
		this.props.setSNMPver(value);
		this.setState({ readCommunity: "" });
	};

	// Confirm fields
	confirm = () => {
		if (this.state.readCommunity === "") {
			this.props.sendError("Please, fill all fields", "options");
			return;
		} else {
			if (this.props.selectedOpts.SNMPver === "v1") {
				this.props.setReadCommunity(this.state.readCommunity, 1);
				this.props.nextStep(4);
			} else if (this.props.selectedOpts.SNMPver === "v1") {
				this.props.setReadCommunity(this.state.readCommunity, 2);
				this.props.nextStep(4);
			}
			this.setState({ modal: true });
			this.props.nextStep(4);
			this.props.clearErrors();
		}
	};

	Content = () => (
		<div>
			<Form>
				<Form.Field>
					<Radio
						label="v1"
						name="radioGroup"
						value="v1"
						checked={this.props.selectedOpts.SNMPver === "v1"}
						onChange={this.changeVersion}
					/>

					<Radio
						label="v2"
						name="radioGroup"
						value="v2"
						checked={this.props.selectedOpts.SNMPver === "v2"}
						onChange={this.changeVersion}
					/>

					<Radio
						label="v3"
						name="radioGroup"
						value="v3"
						checked={this.props.selectedOpts.SNMPver === "v3"}
						onChange={this.changeVersion}
					/>
				</Form.Field>

				{this.props.selectedOpts.SNMPver === "v1" ||
				this.props.selectedOpts.SNMPver === "v2" ? (
					<div>
						<Form.Field>
							<label>Read Community</label>
							<Input
								value={this.state.readCommunity}
								onChange={this.onReadCommunity}
								placeholder="Please, write down read community"
							/>
						</Form.Field>
					</div>
				) : (
					""
				)}
				{this.props.selectedOpts.SNMPver === "v3" ? (
					<SNMPdetails />
				) : (
					""
				)}
			</Form>
		</div>
	);

	render() {
		return (
			<div className="selected-options">
				{this.props.step.step < 3 ? (
					""
				) : (
					<div>
						<Accordion
							fluid={true}
							name="Selected Options"
							content={
								<Accordion
									name="SNMP Version"
									content={this.Content()}
								/>
							}
						/>
						<ClearButton />
					</div>
				)}

				{this.props.selectedOpts.SNMPver === "v1" ||
				this.props.selectedOpts.SNMPver === "v2" ? (
					<Button
						className="discover-basic-options"
						onClick={this.confirm}
						positive>
						Discover
					</Button>
				) : (
					""
				)}
				{this.ModalBox(this.config())}
			</div>
		);
	}
}

SelectedOptions.propTypes = {
	selectedOpts: PropTypes.object.isRequired,
	step: PropTypes.object.isRequired,
	source: PropTypes.object.isRequired,
	setSNMPver: PropTypes.func.isRequired,
	setOptions: PropTypes.func.isRequired,
	setReadCommunity: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired,
	sendError: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	selectedOpts: state.selectedOpts,
	step: state.step,
	source: state.source
});

export default connect(
	mapStateToProps,
	{ setSNMPver, setOptions, setReadCommunity, nextStep, sendError, clearErrors }
)(SelectedOptions);
