// Component that render source picker. triggers next step and discovery options component
import React, { Component } from "react";
import { Dropdown, Input, Form, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import AccordionComponent from "./Accordion";
import ClearButton from "./ClearButton";
import validator from "validator";
import { connect } from "react-redux";
import {
	sourceIp,
	sendError,
	changeSource,
	rangeIp,
	setFile
} from "../actions/sourceActions";
import { nextStep } from "../actions/stepActions";

// Function that converts IP-address into integer number, so we can compare two addressess, and first
// Will not be bigger than second. Hope it works in this way
function ip2int(ip) {
	return (
		ip.split(".").reduce(function(ipInt, octet) {
			return (ipInt << 8) + parseInt(octet, 10);
		}, 0) >>> 0
	);
}

class DiscoverySource extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceValue: "",
			sourceIP: "",
			file: "",
			startIP: "",
			endIP: ""
		};
		this.changeSource = this.changeSource.bind(this);
		this.changeFile = this.changeFile.bind(this);
		this.SourceContent = this.SourceContent.bind(this);
		this.validateIP = this.validateIP.bind(this);
		this.validateStartIP = this.validateStartIP.bind(this);
		this.validateEndIP = this.validateEndIP.bind(this);
	}

	// Set source: IP, IP range or CSV
	changeSource = (e, { value }) => {
		this.setState({
			sourceValue: value,
			sourceIP: "",
			file: "",
			startIP: "",
			endIP: ""
		});
		this.props.changeSource(value);
	};

	// Upload file
	changeFile = ev => {
		this.setState({ file: ev.target.value });
		this.props.setFile(ev.target.value);
		this.props.nextStep(2);
	};
	// Yeah, here and below not very DRY, but this functions call very different actions
	validateStartIP = ev => {
		const re = /^[0-9.\b]+$/;
		if (ev.target.value === "" || re.test(ev.target.value)) {
			this.setState({ startIP: ev.target.value });
			if (ev.target.value.length >= 7) {
				if (validator.isIP(ev.target.value)) {
					this.setState({ startIP: ev.target.value });
				} else {
					this.props.sendError(
						"Your start IP address is invalid. Please check and write again",
						"source"
					);
				}
			}
		}
	};

	validateEndIP = ev => {
		const re = /^[0-9.\b]+$/;
		if (ev.target.value === "" || re.test(ev.target.value)) {
			this.setState({ endIP: ev.target.value });
			if (ev.target.value.length >= 7) {
				if (validator.isIP(ev.target.value)) {
					if (ip2int(this.state.startIP) > ip2int(this.state.endIP)) {
						this.props.sendError(
							"Starting IP address cannot be bigger than ending",
							"source"
						);
					} else {
						this.props.rangeIp(this.state.startIP, ev.target.value);

						this.props.nextStep(2);
					}
				} else {
					this.props.sendError(
						"Your end IP address is invalid. Please check and write again",
						"source"
					);
				}
			}
		}
	};

	validateIP = ev => {
		const re = /^[0-9.\b]+$/;
		if (ev.target.value === "" || re.test(ev.target.value)) {
			this.setState({ sourceIP: ev.target.value });
			if (ev.target.value.length >= 7) {
				if (validator.isIP(ev.target.value)) {
					this.props.sourceIp(ev.target.value);
					this.props.nextStep(2);
				} else {
					this.props.sendError(
						"Your IP address is invalid. Please check and write again",
						"source"
					);
				}
			}
		}
	};

	SourceContent = () => (
		<div>
			<Form>
				<Form.Field>
					<Dropdown
						placeholder="Select source"
						onChange={this.changeSource}
						value={this.state.sourceValue}
						selection
						options={[
							{ text: "IP", value: "IP" },
							{
								text: "IP Range",
								value: "IPRange"
							},
							{ text: "CSV", value: "CSV" }
						]}
					/>
				</Form.Field>
				{this.state.sourceValue === "IP" ? (
					<div>
						<Form.Field>
							<label>IP</label>
							<Input
								type="text"
								name="ip-input"
								value={this.state.sourceIP}
								onChange={this.validateIP}
								placeholder="Input IP"
							/>
						</Form.Field>
					</div>
				) : (
					""
				)}
				{this.state.sourceValue === "IPRange" ? (
					<div>
						<Form.Field>
							<label>Starting IP Address</label>
							<Input
								type="text"
								value={this.state.startIP}
								onChange={this.validateStartIP}
								placeholder="Starting IP"
							/>
						</Form.Field>
						<Form.Field>
							<label>Ending IP Address</label>
							<Input
								type="text"
								value={this.state.endIP}
								onChange={this.validateEndIP}
								placeholder="Ending IP"
							/>
						</Form.Field>
					</div>
				) : (
					""
				)}
				{this.state.sourceValue === "CSV" ? (
					<div>
						<input
							type="file"
							ref={file => {
								this.file = file;
							}}
							onChange={this.changeFile}
							name="csv"
							id="csv"
						/>
						<label className="select-file" htmlFor="csv">
							Select a file..
						</label>

						<span className="file-path">
							{this.state.file
								? `Selected file: ${this.state.file}`
								: ""}
						</span>
					</div>
				) : (
					""
				)}
				{this.props.error.source ? (
					<Message negative>{this.props.error.source}</Message>
				) : (
					""
				)}
			</Form>
		</div>
	);

	render() {
		return (
			<div className="discovery-source">
				<AccordionComponent
					name="Discovery Source"
					content={this.SourceContent()}
				/>
				{this.props.step.step <= 2 ? <ClearButton /> : ""}
			</div>
		);
	}
}

DiscoverySource.propTypes = {
	source: PropTypes.object.isRequired,
	step: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	sourceIp: PropTypes.func.isRequired,
	sendError: PropTypes.func.isRequired,
	changeSource: PropTypes.func.isRequired,
	rangeIp: PropTypes.func.isRequired,
	setFile: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	source: state.source,
	step: state.step,
	error: state.error
});

export default connect(
	mapStateToProps,
	{ sourceIp, sendError, changeSource, rangeIp, setFile, nextStep }
)(DiscoverySource);
