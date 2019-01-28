import { combineReducers } from 'redux';
import sourceReducer from "./sourceReducer";
import stepReducer from "./stepReducer";
import errorReducer from "./errorReducer";
import selectedOptionsReducer from "./selectedOptionsReducer";

export default combineReducers({
    source: sourceReducer,
    step: stepReducer,
    error: errorReducer,
    selectedOpts: selectedOptionsReducer
});