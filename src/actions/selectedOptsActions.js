import {
	SET_SNMP_VER,
	SET_SELECTED_OPTIONS,
	SET_READ_COMMUNITY
} from "./constants";

export const setSNMPver = ver => dispatch => {
	dispatch({ type: SET_SNMP_VER, ver });
};

export const setOptions = options => dispatch => {
	dispatch({ type: SET_SELECTED_OPTIONS, options });
};

export const setReadCommunity = (text, ver) => dispatch => {
	dispatch({ type: SET_READ_COMMUNITY, text, ver });
};
