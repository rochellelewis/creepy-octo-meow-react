import React from "react";

import {GetUsername} from "./GetUsername";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PostCard = ({post}) => {

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
									<GetUsername profileId={post.postProfileId} />
								</Badge>
							</h6>
							{formatDate.format(post.postDate)}
						</div>
						<Button variant="outline-secondary" size="sm" className="mr-2">
							<FontAwesomeIcon icon="trash-alt"/>
						</Button>
						<Button variant="outline-secondary" size="sm" className="mr-2">
							<FontAwesomeIcon icon="pencil-alt"/>
						</Button>
						<Button variant="outline-danger" size="sm">
							<FontAwesomeIcon icon="heart"/>&nbsp;
							<Badge variant="danger">99</Badge>
						</Button>
					</div>
					<hr />
					<Card.Text>{post.postContent}</Card.Text>
				</Card.Body>
			</Card>
		</>
	)
};