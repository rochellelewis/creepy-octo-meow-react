import React, {useState} from "react";
import {httpConfig} from "../../shared/misc/http-config";
import {UseJwt, UseJwtProfileId} from "../../shared/misc/JwtHelpers";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PostLike = ({postId}) => {

	// grab jwt and profile id
	const jwt = UseJwt();
	const profileId = UseJwtProfileId(jwt);

	const [status, setStatus] = useState(null);
	const [isLiked, setIsLiked] = useState(false);

	const handleLike = () => {
		let like = !isLiked ? setIsLiked(true) : setIsLiked(false);
		console.log(like);
	};

	const likeData = {
		likePostId: postId,
		likeProfileId: profileId
	};

	const submitLike = () => {
		const headers = {'X-JWT-TOKEN': jwt};
		httpConfig.post("/apis/like/", likeData, {
			headers: headers})
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});
				if(reply.status === 200) {
					setStatus({message, type});
				}
				alert(reply.message);
			});
	};

	const deleteLike = () => {
		const headers = {'X-JWT-TOKEN': jwt};
		const data = {
			likePostId:postId,
			likeProfileId:profileId
		};
		httpConfig.delete("/apis/like/", {
			headers, data})
			.then(reply => {
				let {message, type} = reply;
				if(reply.status === 200) {}
				alert(reply.message);
			});
	};

	return (
		<>
			<Button variant="outline-danger" size="sm" onClick={deleteLike}>
				<FontAwesomeIcon icon="heart"/>&nbsp;
				<Badge variant="danger">999</Badge>
			</Button>
		</>
	)
};