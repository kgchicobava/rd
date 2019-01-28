import {
	SOURCE_IP,
	SOURCE_IP_RANGE,
	SOURCE_CSV,
	IP_RANGE_CHANGE,
	SOURCE_IP_SELECTED,
	SET_FILE
} from "../actions/constants";

const initialState = {
	inputType: "",
	ipAddress: "",
	startIPAddress: "",
	endIPAddress: "",
	file: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SOURCE_IP_SELECTED:
			return {
				...state,
				ipAddress: action.IP
			};
		case SOURCE_IP:
			return {
				...state,
				inputType: "IP"
			};

		case SOURCE_IP_RANGE:
			return {
				...state,
				inputType: "IPRange"
			};
		case SOURCE_CSV:
			return {
				...state,
				inputType: "CSV"
			};
		case IP_RANGE_CHANGE:
			return {
				...state,
				startIPAddress: action.firstIP,
				endIPAddress: action.secondIP
			}
        case SET_FILE:
            return {
                ...state,
                file: action.file
            }
		default:
			return state;
	}
};
