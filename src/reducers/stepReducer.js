import { NEXT_STEP, PREVIOUS_STEP } from "../actions/constants";

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
            }
		default:
			return state;
	}
};
