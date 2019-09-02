import {combineReducers} from "redux"
import postReducer from "./post-reducer";
import profileReducer from "./profile-reducer";
import likeReducer from "./like-reducer"

export default combineReducers({
	posts: postReducer,
	profile: profileReducer,
	likes: likeReducer
})