import {
	SOURCE_IP,
	SOURCE_IP_RANGE,
    SOURCE_CSV,
    IP_RANGE_CHANGE,
	ERROR,
	CLEAN_ERRORS,
    CHANGE_SOURCE,
    SOURCE_IP_SELECTED,
    SET_FILE
} from "../actions/constants";

export const sourceIp = IP => dispatch => {
	dispatch({ type: CLEAN_ERRORS });
	dispatch({ type: SOURCE_IP_SELECTED, IP });
};

export const sendError = (error, place) => dispatch => {
	dispatch({ type: ERROR, error, place });
};

export const setFile = (file) => dispatch => {
    dispatch({type: SET_FILE, file});
}

export const changeSource = value => dispatch => {
	dispatch({ type: CLEAN_ERRORS });
	switch (value) {
		case "IP":
			dispatch({ type: SOURCE_IP });
			break;
		case "IPRange":
			dispatch({ type: SOURCE_IP_RANGE });
            break;
        case "CSV":
        dispatch({type: SOURCE_CSV});
        break;
		default:
			return;
	}
};

export const rangeIp = (firstIP, secondIP) => dispatch => {
    dispatch({type: CLEAN_ERRORS})
    dispatch({type: IP_RANGE_CHANGE, firstIP, secondIP});
}