import { NEXT_STEP, PREVIOUS_STEP, CLEAR_ALL } from "../actions/constants";

const initialState = {
	step: 1
};

export default (state = initialState, action) => {
	switch (action.type) {
		case NEXT_STEP:
			return {
				...state,
				step: action.step
			};
		case PREVIOUS_STEP:
			return {
				...state,
				step: action.step
			};
		case CLEAR_ALL:
			return {
				...initialState
			};
		default:
			return state;
	}
};
