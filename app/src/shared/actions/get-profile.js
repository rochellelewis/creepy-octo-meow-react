import {httpConfig} from "../misc/http-config";

export const getProfileByProfileId = (id) => async dispatch => {
	const {data} = await httpConfig(`/apis/profile/${id}`);
	dispatch({type: "GET_PROFILE_BY_PROFILE_ID", payload: data })
};

export const getProfileByProfileEmail = (email) => async dispatch => {
	const {data} = await httpConfig(`/apis/profile/${email}`);
	dispatch({type: "GET_PROFILE_BY_PROFILE_EMAIL", payload: data })
};