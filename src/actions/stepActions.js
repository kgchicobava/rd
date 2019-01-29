// actions that operates step logic
import { NEXT_STEP, PREVIOUS_STEP, CLEAR_ALL } from "./constants";

export const nextStep = step => dispatch => {
	dispatch({ type: NEXT_STEP, step });
};

export const previousStep = step => dispatch => {
	dispatch({ type: PREVIOUS_STEP, step });
};

export const clearAll = () => dispatch => {
	dispatch({ type: CLEAR_ALL });
};
