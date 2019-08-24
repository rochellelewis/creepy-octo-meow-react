import React, {useState, useEffect} from "react";

import {PostForm} from "./PostForm";
import {PostCard} from "./PostCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Posts = () => {

	return (
		<>
			<main className="my-5 py-5">
				<Container fluid="true">
					<Row>

						{/*BEGIN FORM PANEL*/}
						<Col md={4} className="posts-form-panel position-fixed">

							{/* TODO: update this dirty non-responsive solution someday */}
							{window.innerWidth < 768 ? (
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