import {
	SET_SNMP_VER,
	SET_SELECTED_OPTIONS,
	SET_READ_COMMUNITY
} from "../actions/constants";

const initialState = {
	SNMPver: "",
	snmpv1 : {
		readCommunity: ""
	},
	snmpv2: {
		readCommunity: ""
	},
	snmpv3: {
		readCommunity: "",
		securityOptions: "",
		contextName: "",
		contextEngineID: "",
		authenticationAlgorithm: {
			password: "",
			code: ""
		},
		encryptionAlgorithm: {
			code: ""
		}
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SNMP_VER:
			return {
				...state,
				SNMPver: action.ver
			};
		case SET_SELECTED_OPTIONS:
			return {
				...state,
				snmpv1: null,
				snmpv2: null,
				snmpv3: {...state.snmpv3,
					readCommunity: action.options.readCommunity,
					securityOptions: action.options.securityOptions,
					contextName: action.options.contextName,
					contextEngineID: action.options.contextEngineID,
					authenticationAlgorithm: action.options.authenticationAlgorithm
				}
			};
		case SET_READ_COMMUNITY:
			switch(action.ver) {
				case 1:
				return {
					...state,
					snmpv1: {
						readCommunity: action.text
					},
					snmpv2: null,
					snmpv3: null,
				}
				case 2:
				return {
					...state,
					snmpv1: null,
					snmpv2: {
						readCommunity: action.text
					},
					snmpv3: null,
				}
				default:
				return state
			}
		default:
			return state;
	}
};
