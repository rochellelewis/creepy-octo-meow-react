export default (state = [], action) => {
	switch(action.type) {
		case "GET_ALL_LIKES":
			return action.payload;
		case "GET_LIKES_BY_POST_ID":
			return action.payload;
		case "GET_LIKES_BY_PROFILE_ID":
			return action.payload;
		case "GET_LIKE_BY_POST_ID_AND_PROFILE_ID":
			return [...state, action.payload];
		default:
			return state;
	}
}