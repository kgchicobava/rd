import { NEXT_STEP, PREVIOUS_STEP } from "./constants";

export const nextStep = (step) => dispatch => {
    dispatch({type: NEXT_STEP, step});
}

export const previousStep = (step) => dispatch => {
    dispatch({type: PREVIOUS_STEP, step});
}