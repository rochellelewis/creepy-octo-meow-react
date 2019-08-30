import React, {useState} from "react";
import {UseJwt, UseJwtProfileId} from "../../shared/misc/JwtHelpers";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {httpConfig} from "../../shared/misc/http-config";

export const PostLike = ({post}) => {

	// grab jwt and profile id
	const jwt = UseJwt();
	const profileId = UseJwtProfileId(jwt);

	const [status, setStatus] = useState(null);
	const [likes, setLikes] = useState(0);


	const likeData = {
		likePostId: post.postId,
		likeProfileId: profileId
	};

	const submitLike = () => {

		httpConfig.post("/apis/like/", likeData, {
			headers: jwt})
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});
				if(reply.status === 200) {
					setStatus({message, type});
				}
			});
	};

	return (
		<>
			<Button variant="outline-danger" size="sm" onClick={submitLike}>
				<FontAwesomeIcon icon="heart"/>&nbsp;
				<Badge variant="danger">{likes}</Badge>
			</Button>
		</>
	)
};