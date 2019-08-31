import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {httpConfig} from "../shared/misc/http-config";
import _ from "lodash";

import {UseJwt, UseJwtProfileId} from "../shared/misc/JwtHelpers";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAllLikes, getLikeByPostIdAndProfileId, getLikesByProfileId} from "../shared/actions/get-like";
import {getPostsAndProfiles} from "../shared/actions/get-post";

export const Like = ({postId, profileId, jwt}) => {

	// Returns the likes store from redux and assigns it to the posts variable.
	const likes = useSelector(state => (state.likes ? state.likes : []));

	const [status, setStatus] = useState(null);
	const [isLiked, setIsLiked] = useState(null);

	const dispatch = useDispatch();

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
				setStatus({message, type});
				if(reply.status === 200) {
					setStatus({message, type});
					toggleLike();
					console.log(isLiked);
				}
				alert(reply.message);
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
					console.log(isLiked);
				}
				alert(reply.message);
			});
	};

	const clickLike = ({postId, profileId}) => {
		if(isLiked === "liked") {
			deleteLike();
			console.log(isLiked);
		}

		if(isLiked === null) {
			submitLike();
			console.log(isLiked);
		}
	};

	return (
		<>
			<Button variant="outline-danger" size="sm" className={`post-like-btn ${(isLiked !== null ? isLiked : "")}`} onClick={toggleLike}>
				<FontAwesomeIcon icon="heart"/>&nbsp;
				<Badge variant="danger">999</Badge>
			</Button>
		</>
	)
};