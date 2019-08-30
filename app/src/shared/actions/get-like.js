import {httpConfig} from "../misc/http-config";

export const getLikesByPostId = () => async dispatch => {
	const {data} = await httpConfig('/apis/post/');
	dispatch({type: "GET_LIKES_BY_POST_ID", payload: data })
};

export const getLikesByProfileId = () => async dispatch => {
	const {data} = await httpConfig('/apis/post/');
	dispatch({type: "GET_LIKES_BY_PROFILE_ID", payload: data })
};

export const getLikeByPostIdAndProfileId = (postId, profileId) => async dispatch => {
	const {data} = await httpConfig(`/apis/post/?likePostId=${postId}&likeProfileId=${profileId}`);
	dispatch({type: "GET_LIKES_BY_POST_ID_AND_PROFILE_ID", payload: data })
};