import { ERROR, CLEAN_ERRORS, CLEAR_ALL } from "../actions/constants";

const initialState = {
	source: "",
	options: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ERROR:
			return {
				...state,
				[action.place]: action.error
			};
		case CLEAN_ERRORS:
			return {
				...state,
				source: "",
				options: ""
			};
		case CLEAR_ALL: {
			return {
				...initialState
			}
		}
		default:
			return state;
	}
};
