import React from "react";
import {Link} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Footer = () => (
	<>
		<footer className="page-footer text-muted py-2 py-md-4">
			<Container fluid="true">
				<Row>
					<Col sm="6" className="text-center text-sm-left small">
						Octo Meow 7.0 => A DDC React Demo.
					</Col>
					<Col sm="6" className="text-center text-sm-right small">
						<FontAwesomeIcon icon={['fab','github']}/>&nbsp;
						<a href="https://github.com/rlewis2892/creepy-octo-meow-react" className="text-muted" target="_blank" rel="noopener noreferrer">View on GitHub</a> | <Link className="text-muted" to="/about">About Us</Link>
					</Col>
				</Row>
			</Container>
		</footer>
	</>
);