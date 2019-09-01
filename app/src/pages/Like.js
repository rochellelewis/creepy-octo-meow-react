import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {httpConfig} from "../shared/misc/http-config";
import _ from "lodash";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UseJwt} from "../shared/misc/JwtHelpers";

export const Like = ({profileId, postId}) => {

	const jwt = UseJwt();

	/*
	* The isLiked state variable sets the button color
	* whether the logged in user has liked the post.
	* */
	const [isLiked, setIsLiked] = useState(null);
	const [likeCount, setLikeCount] = useState(0);


	// Return all likes from the redux store
	const likes = useSelector(state => (state.likes ? state.likes : []));

	const effects = () => {
		initializeLikes(profileId);
		countLikes();
	};

	const inputs = [postId];
	useEffect(effects, inputs);

	/*
	* This function filters over the likes from the store,
	* and sets the isLiked state variable to "active" if
	* the logged in user has liked the post.
	*
	* See: Lodash https://lodash.com
	* */
	const initializeLikes = (profileId) => {
		const profileLikes = likes.filter(like => like.likeProfileId === profileId);
		const liked = _.find(profileLikes, {'likePostId': postId});
		return (_.isEmpty(liked) === false) && setIsLiked("active");
	};

	const countLikes = () => {
		const postLikes = likes.filter(like => like.likePostId === postId);
		return (setLikeCount(postLikes.length));
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
					setLikeCount(likeCount + 1);
				}

				// if there's an issue with a $_SESSION mismatch with xsrf or jwt, alert user and do a sign out
				if(reply.status === 401) {
					alert("Session inactive. Please log in again.");
					httpConfig.get("/apis/signout/")
						.then(reply => {
							let {message, type} = reply;
							if(reply.status === 200) {
								window.localStorage.removeItem("jwt-token");
								console.log(reply);
								setTimeout(() => {
									window.location = "/";
								}, 1500);
							}
						});
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
					setLikeCount(likeCount > 0 ? likeCount - 1 : 0);
				}

				// if there's an issue with a $_SESSION mismatch with xsrf or jwt, alert user and do a sign out
				if(reply.status === 401) {
					alert("Session inactive. Please log in again.");
					httpConfig.get("/apis/signout/")
						.then(reply => {
							let {message, type} = reply;
							if(reply.status === 200) {
								window.localStorage.removeItem("jwt-token");
								console.log(reply);
								setTimeout(() => {
									window.location = "/";
								}, 1500);
							}
						});
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
				<Badge variant="danger">{likeCount}</Badge>
			</Button>
		</>
	)
};