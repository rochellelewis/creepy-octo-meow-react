import React from "react"
import {Link} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Profile = () => {
	return (
		<>
			<main className="mh-80 mt-5 py-5 d-flex align-items-center">
				<Container fluid="true">
					<Row>
						<Col>
							<h2>This is the profile page.</h2>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
};