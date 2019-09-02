import {httpConfig} from "../misc/http-config";

export const getAllLikes = () => async dispatch => {
	const {data} = await httpConfig('/apis/like/');
	dispatch({type: "GET_ALL_LIKES", payload: data })
};