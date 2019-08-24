import React from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";

export const PostForm = () => {
	return (
		<>
			<Card bg="light" className="mb-3">
				<Card.Body>
					<Form>
						<Form.Group>
							<InputGroup>
								<FormControl type="text" placeholder="Post Title"/>
							</InputGroup>
						</Form.Group>
						<Form.Group>
							<InputGroup>
								<FormControl as="textarea" rows="5" placeholder="Your opinion here..."/>
							</InputGroup>
						</Form.Group>
						<Form.Group>
							<Button variant="primary">Post!</Button>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</>
	)
};