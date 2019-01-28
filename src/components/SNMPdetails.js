import React, { Component } from "react";
import {
	Input,
	Dropdown,
	Form,
	Radio,
	Button,
	Message,
	Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import { setSNMPver, setOptions } from "../actions/selectedOptsActions";
import { sendError } from "../actions/sourceActions";
import validator from "validator";
import omitEmpty from "omit-empty";
import { nextStep } from "../actions/stepActions";



class SNMPdetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			readCommunity: "",
			securityOptions: "",
			contextName: "",
			contextEngineID: "",
			authenticationAlgorithm: "",
			password: "",
			modal: false
		};
		this.onChangeAlgorithm = this.onChangeAlgorithm.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onChangeDropdown = this.onChangeDropdown.bind(this);
		this.confirm = this.confirm.bind(this);
		this.config = this.config.bind(this);
	}
	closeModal = () => this.setState({ modal: false })
	ModalBox = (config) => (
		<Modal onClose={this.closeModal} open={this.state.modal}>
			<pre>{`${JSON.stringify(config, null, 2)}`}</pre>
			<Button onClick={this.closeModal}>Close</Button>
		</Modal>
	  )

	onInputChange = ev => {
		this.setState({ [ev.target.name]: ev.target.value });
	};

	onChangeDropdown = (e, { value }) => {
		this.setState({ securityOptions: value });
	};

	onChangeAlgorithm = (ev, { value }) => {
		this.setState({ authenticationAlgorithm: value });
	};

	config = () => {
		const { selectedOpts, source } = this.props;
		let sourceData = omitEmpty(source)
		return {
			content: {
				...sourceData,
				snmpConfig : {
					version: selectedOpts.SNMPver,
					snmpv1: selectedOpts.snmpv1,
					snmpv2: selectedOpts.snmpv2,
					snmpv3: selectedOpts.snmpv3
				}
			}
	}}

	confirm = () => {
		if (Object.values(this.state).some(elem => validator.isEmpty(elem.toString()))) {
			this.props.sendError("Please, fill all fields", "options");
			return;
		} else {
			const options = {
				readCommunity: this.state.readCommunity,
				securityOptions: this.state.securityOptions,
				contextName: this.state.contextName,
				contextEngineID: this.state.contextEngineID,
				authenticationAlgorithm: {
					password: this.state.password,
					code: this.state.authenticationAlgorithm
				}
			};
			this.props.setOptions(options);
			this.props.nextStep(4);
			this.setState({modal: true});
		}
	};

	render() {
		return (
			<div>
				{this.props.error.options ? (
					<Message negative>{this.props.error.options}</Message>
				) : (
					""
				)}

				<Form.Field>
					<label>Read Community</label>
					<Input name="readCommunity" onChange={this.onInputChange} />
				</Form.Field>
				<Form.Field>
					<Dropdown
						selection
						name="securityOptions"
						onChange={this.onChangeDropdown}
						value={this.state.securityOptions}
						placeholder="Please select"
						options={[
							{
								text: "Authentication and No Privacy",
								value: "Authentication and No Privacy"
							}
						]}
					/>
				</Form.Field>
				<Form.Field>
					<label>Context name</label>
					<Input name="contextName" onChange={this.onInputChange} />
				</Form.Field>
				<Form.Field>
					<label>Context Engine ID</label>
					<Input
						name="contextEngineID"
						onChange={this.onInputChange}
					/>
				</Form.Field>

				<Form.Field>
					<label>Authentication Algorhithm</label>
					<Radio
						label="MD5"
						name="radioGroup"
						value="md5"
						checked={this.state.authenticationAlgorithm === "md5"}
						onChange={this.onChangeAlgorithm}
					/>

					<Radio
						label="SHA"
						name="radioGroup"
						value="sha"
						checked={this.state.authenticationAlgorithm === "sha"}
						onChange={this.onChangeAlgorithm}
					/>

					<Radio
						label="HMAC128"
						name="radioGroup"
						value="hmac128"
						checked={
							this.state.authenticationAlgorithm === "hmac128"
						}
						onChange={this.onChangeAlgorithm}
					/>

					<Radio
						label="HMAC192"
						name="radioGroup"
						value="hmac192"
						checked={
							this.state.authenticationAlgorithm === "hmac192"
						}
						onChange={this.onChangeAlgorithm}
					/>

					<Radio
						label="HMAC256"
						name="radioGroup"
						value="hmac256"
						checked={
							this.state.authenticationAlgorithm === "hmac256"
						}
						onChange={this.onChangeAlgorithm}
					/>

					<Radio
						label="HMAC384"
						name="radioGroup"
						value="hmac384"
						checked={
							this.state.authenticationAlgorithm === "hmac384"
						}
						onChange={this.onChangeAlgorithm}
					/>
				</Form.Field>
				<Form.Field>
					<label>Authentication Password</label>
					<Input name="password" onChange={this.onInputChange} />
				</Form.Field>
				{this.props.selectedOpts.SNMPver === "v3" ? <Button className="discover" onClick={this.confirm} positive>Discover</Button> : ""}

				{this.ModalBox(this.config())}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedOpts: state.selectedOpts,
	error: state.error,
	source: state.source
});

export default connect(
	mapStateToProps,
	{ setSNMPver, setOptions, sendError, nextStep }
)(SNMPdetails);
