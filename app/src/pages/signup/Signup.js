import React from "react"

import {SignUpForm} from "./SignUpForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Signup = () => {
	return (
		<>
			<main className="d-flex align-items-center mh-80">
				<Container fluid="true">
					<Row>
						<Col sm={6} lg={{span: 4, offset: 1}}>
							<Card bg="transparent" className="border-0 rounded-0">
								<Card.Body>
									<SignUpForm/>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
};