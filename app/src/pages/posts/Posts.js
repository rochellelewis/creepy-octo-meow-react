import React from "react";

import {PostForm} from "./PostForm";
import {PostCard} from "./PostCard";
import {UseWindowWidth} from "../../shared/components/UseWindowWidth";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Posts = () => {

	/*
	* const width holds the value of the screen width on the resize event.
	* See: UseWindowWidth
	* */
	const width = UseWindowWidth();

	return (
		<>
			<main className="my-5 py-5">
				<Container fluid="true">
					<Row>

						{/*BEGIN FORM PANEL*/}
						<Col md={4} className="posts-form-panel position-fixed">

							{/* This ternary will render the PostForm in either
							one of two different ways depending on the screen width.
							This allows the rendering of this element to be responsive. */}
							{width < 768 ? (
								<Accordion defaultActiveKey="1" className="d-md-none">
									<Accordion.Toggle as={Button} variant="primary" eventKey="0" className="btn-block">
										<FontAwesomeIcon icon="pencil-alt"/>&nbsp;Write A Post
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="0">
										<PostForm/>
									</Accordion.Collapse>
								</Accordion>
							) : (
								<PostForm/>
							)}

						</Col>

						{/* BEGIN POST ITEMS */}
						<Col md={{span: 8, offset: 4}} className="posts-panel">
							<PostCard/>
						</Col>

					</Row>
				</Container>
			</main>
		</>
	)
};