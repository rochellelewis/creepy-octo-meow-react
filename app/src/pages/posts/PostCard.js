import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {Like} from "../Like";
import {PostUsername} from "./PostUsername";
import {UseJwt, UseJwtProfileId} from "../../shared/misc/JwtHelpers";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {httpConfig} from "../../shared/misc/http-config";

export const PostCard = ({post}) => {

	// grab jwt and jwt profile id of logged in users
	const jwt = UseJwt();
	const profileId = UseJwtProfileId();

	const deletePost = () => {
		const headers = {'X-JWT-TOKEN': jwt};
		const params = {id: post.postId};
		let confirm = window.confirm("Are you sure u wanna delete this?");
		if(confirm){
			httpConfig.delete("/apis/post/", {
				headers, params})
				.then(reply => {
					let {message, type} = reply;
					if(reply.status === 200) {
						window.location.reload();
					}
				});
		}
	};

	const formatDate = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'numeric',
		year: '2-digit',
		hour: 'numeric',
		minute: 'numeric',
		second: '2-digit',
		timeZoneName: 'short'
	});

	return (
		<>
			<Card className="mb-3">
				<Card.Header>
					<h3 className="panel-title my-0">{post.postTitle}</h3>
				</Card.Header>
				<Card.Body>
					<div className="d-flex justify-content-end">
						<div className="d-inline-block small text-muted mr-auto my-auto">
							<h6 className="d-sm-inline-block">
								<Badge className="p-1 mr-2" variant="secondary">By:&nbsp;
									<PostUsername profileId={post.postProfileId} />
								</Badge>
							</h6>
							{formatDate.format(post.postDate)}
						</div>

						{/* conditional render del & edit buttons if logged into account that created them! */}
						{(profileId === post.postProfileId) && (
							<>
								<Button onClick={deletePost} variant="outline-secondary" size="sm" className="mr-2">
									<FontAwesomeIcon icon="trash-alt"/>
								</Button>
								<Button variant="outline-secondary" size="sm" className="mr-2">
									<FontAwesomeIcon icon="pencil-alt"/>
								</Button>
							</>
						)}

						{/* conditional render like button only if logged in */}
						{(jwt !== null) && (
							<Like postId={post.postId}/>
						)}

					</div>
					<hr />
					<Card.Text>{post.postContent}</Card.Text>
				</Card.Body>
			</Card>
		</>
	)
};