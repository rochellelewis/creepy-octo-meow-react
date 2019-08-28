import React from "react"

import {SignInForm} from "../../shared/components/sign-in/SignInForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Home = () => {
	return (
		<>
			<main className="d-flex align-items-center mh-80">
				<Container fluid="true">
					<Row>
						<Col sm={6} lg={{span: 4, offset: 1}}>
							<SignInForm/>
						</Col>
					</Row>
				</Container>
			</main>

		</>
	)
};