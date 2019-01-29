// Actions for the largest section, when snmp ver. 3
import {
	SET_SNMP_VER,
	SET_SELECTED_OPTIONS,
	SET_READ_COMMUNITY
} from "./constants";

export const setSNMPver = ver => dispatch => {
	dispatch({ type: SET_SNMP_VER, ver });
};
// If snmp ver 3, set all options
export const setOptions = options => dispatch => {
	dispatch({ type: SET_SELECTED_OPTIONS, options });
};
// If snmp ver 1 or 2, set only read community text
export const setReadCommunity = (text, ver) => dispatch => {
	dispatch({ type: SET_READ_COMMUNITY, text, ver });
};
