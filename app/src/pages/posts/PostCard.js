import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Badge from "react-bootstrap/Badge";

export const PostCard = ({post}) => {
	return (
		<>
			<Card className="mb-3">
				<Card.Header>
					<h3 className="panel-title my-0">{post.title}</h3>
				</Card.Header>
				<Card.Body>
					<div className="d-flex justify-content-end">
						<div className="d-inline-block small text-muted mr-auto my-auto">Author | Date</div>
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