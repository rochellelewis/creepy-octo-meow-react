import React from "react";
import {Link} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Footer = () => (
	<>
		<footer className="page-footer text-muted py-4">
			<Container fluid="true">
				<Row>
					<div className="col-sm-6 text-center text-sm-left small">
						Octo Meow 7.0 => A DDC React Demo.
					</div>
					<div className="col-sm-6 text-center text-sm-right small">
						<FontAwesomeIcon icon={['fab','github']}/>&nbsp;
						<a href="https://github.com/rlewis2892/creepy-octo-meow-react" className="text-muted" target="_blank">View on GitHub</a> | <Link className="text-muted" to="/about">About Us</Link>
					</div>
				</Row>
			</Container>
		</footer>
	</>
);