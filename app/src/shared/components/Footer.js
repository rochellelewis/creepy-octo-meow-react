import React from "react";
import {Link} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Footer = () => {
	return (
		<>
			<footer className="page-footer text-muted small py-2 fixed-bottom bg-light">
				<Container fluid="true">
					<Row>
						<Col sm={{span: 6, offset: 3}} className="text-center">
							<FontAwesomeIcon icon={['fab','github']}/>&nbsp;
							<a href="https://github.com/rlewis2892/creepy-octo-meow-react" className="text-muted" target="_blank" rel="noopener noreferrer">View on GitHub</a> | <Link className="text-muted" to="/about">About Us</Link>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	)
};
