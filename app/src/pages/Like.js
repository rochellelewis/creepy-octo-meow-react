import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {httpConfig} from "../shared/misc/http-config";
import _ from "lodash";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Like = ({postId, profileId, jwt}) => {

	// Returns the likes store from redux and assigns it to the posts variable.
	const likes = useSelector(state => (state.likes ? state.likes : []));

	/*
	* The isLiked state variable sets the button color
	* whether the logged in user has liked the post.
	* */
	const [isLiked, setIsLiked] = useState(null);

	const effects = () => {
		initializeLikes(postId);
	};

	const inputs = [postId];
	useEffect(effects, inputs);

	/*
	* This function sets the isLiked state variable to
	* "active" if the logged in user has liked the post.
	*
	* See: Lodash https://lodash.com
	* */
	const initializeLikes = (postId) => {
		const liked = _.find(likes, {'likePostId': postId});
		return (_.isEmpty(liked) === false) && setIsLiked("active");
	};

	const data = {
		likePostId: postId,
		likeProfileId: profileId
	};

	const toggleLike = () => {
		setIsLiked(isLiked === null ? "active" : null);
	};

	const submitLike = () => {
		const headers = {'X-JWT-TOKEN': jwt};
		httpConfig.post("/apis/like/", data, {
			headers: headers})
			.then(reply => {
				let {message, type} = reply;
				if(reply.status === 200) {
					toggleLike();
				}
			});
	};

	const deleteLike = () => {
		const headers = {'X-JWT-TOKEN': jwt};
		httpConfig.delete("/apis/like/", {
			headers, data})
			.then(reply => {
				let {message, type} = reply;
				if(reply.status === 200) {
					toggleLike();
				}
			});
	};

	// fire this function onclick
	const clickLike = () => {
		(isLiked === "active") ? deleteLike() : submitLike();
	};

	return (
		<>
			<Button variant="outline-danger" size="sm" className={`post-like-btn ${(isLiked !== null ? isLiked : "")}`} onClick={clickLike}>
				<FontAwesomeIcon icon="heart"/>&nbsp;
				<Badge variant="danger">999</Badge>
			</Button>
		</>
	)
};