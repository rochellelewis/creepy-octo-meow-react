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

	const likeData = {
		likePostId: postId,
		likeProfileId: profileId
	};

	const submitLike = () => {
		// grab jwt token to pass in headers on post request
		const headers = {
			'X-JWT-TOKEN': window.localStorage.getItem("jwt-token")
		};

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

	return (
		<>
			<Button variant="outline-danger" size="sm" onClick={submitLike}>
				<FontAwesomeIcon icon="heart"/>&nbsp;
				<Badge variant="danger">999</Badge>
			</Button>
		</>
	)
};