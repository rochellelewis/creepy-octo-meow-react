import {httpConfig} from "../misc/http-config";

export const getAllPosts = () => async dispatch => {
	const {data} = await httpConfig('/apis/post/');
	dispatch({type: "GET_ALL_POSTS", payload: data })
};
