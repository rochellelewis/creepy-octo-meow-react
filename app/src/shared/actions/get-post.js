import {httpConfig} from "../misc/http-config";
import _ from "lodash";
import {getProfileByProfileId} from "./get-profile";

export const getAllPosts = () => async dispatch => {
	const {data} = await httpConfig('/apis/post/');
	dispatch({type: "GET_ALL_POSTS", payload: data })
};

export const getPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(getAllPosts());

	const profileIds = _.uniq(_.map(getState().posts, "postProfileId"));
	profileIds.forEach(id => dispatch(getProfileByProfileId(id)));

	//commented out lines below are equivalent to the _ chain method
	// _.chain(getState().posts)
	// 	.map("postProfileId")
	// 	.uniq()
	// 	.forEach(id => dispatch(getProfileByProfileId(id)))
	// 	.value()
};