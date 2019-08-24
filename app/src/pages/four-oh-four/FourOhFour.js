import React from "react"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FourOhFour = () => {
	return (
		<>
			<main className="d-flex align-items-center py-5 mh-80">
				<Container fluid="true">
					<Row>
						<Col>
							<h1>404 Error: Y U NO FIND?</h1>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
};