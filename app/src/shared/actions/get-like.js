import {httpConfig} from "../misc/http-config";

export const getAllLikes = () => async dispatch => {
	const {data} = await httpConfig('/apis/like/');
	dispatch({type: "GET_ALL_LIKES", payload: data })
};

export const getLikesByPostId = () => async dispatch => {
	const {data} = await httpConfig(`/apis/like/?likePostId=${id}`);
	dispatch({type: "GET_LIKES_BY_POST_ID", payload: data })
};

export const getLikesByProfileId = () => async dispatch => {
	const {data} = await httpConfig(`/apis/like/?likeProfileId=${id}`);
	dispatch({type: "GET_LIKES_BY_PROFILE_ID", payload: data })
};

export const getLikeByPostIdAndProfileId = (postId, profileId) => async dispatch => {
	const {data} = await httpConfig(`/apis/like/?likePostId=${postId}&likeProfileId=${profileId}`);
	dispatch({type: "GET_LIKES_BY_POST_ID_AND_PROFILE_ID", payload: data })
};