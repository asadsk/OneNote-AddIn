import { combineReducers } from "redux";
import { tags } from './tags-reducer'

const rootReducer = combineReducers({
    tags
});

export default rootReducer;