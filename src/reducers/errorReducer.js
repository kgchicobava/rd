import { ERROR, CLEAN_ERRORS } from "../actions/constants";

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
		default:
			return state;
	}
};
