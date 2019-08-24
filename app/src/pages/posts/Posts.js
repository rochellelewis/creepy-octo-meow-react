import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Posts = () => {
	return (
		<>
			<main className="my-5 py-5">
				<Container fluid="true">
					<Row>

						{/*BEGIN FORM PANEL*/}
						<div className="posts-form-panel col-md-4 position-fixed">
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
						</div>

						{/* BEGIN POSTS PANEL*/}
						<div className="posts-panel col-md-8 offset-md-4">

							{/* BEGIN POST ITEM */}
							<Card className="mb-3">
								<Card.Header>
									<h3 className="panel-title my-0">Post Title</h3>
								</Card.Header>
								<Card.Body>
									<div className="d-flex justify-content-end">
										<div className="d-inline-block small text-muted mr-auto my-auto">Author | Datetime</div>
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
									<Card.Text>Content Here</Card.Text>
								</Card.Body>
							</Card>

						</div>

					</Row>
				</Container>
			</main>
		</>
	)
};