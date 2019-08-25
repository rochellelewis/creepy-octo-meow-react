import {combineReducers} from "redux"
import postReducer from "./post-reducer";
import profileReducer from "./profile-reducer";

export default combineReducers({
	posts: postReducer,
	profile: profileReducer,
})