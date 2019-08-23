import React from "react"
import {Link} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/*TODO: check input id/name values against API*/
export const Home = () => {
	return (
		<>
			<main className="d-flex align-items-center mh-80">
				<Container fluid="true">
					<Row>
						<div className="col-sm-6 col-lg-4 offset-lg-1">
							<Card bg="transparent" className="border-0 rounded-0">
								<Card.Body>
									<Form>

										<Form.Group>
											<InputGroup>
												<InputGroup.Prepend>
													<InputGroup.Text>
														<FontAwesomeIcon icon="envelope"/>
													</InputGroup.Text>
												</InputGroup.Prepend>
												<FormControl type="email" placeholder="Email"></FormControl>
											</InputGroup>
										</Form.Group>

										<Form.Group>
											<InputGroup>
												<InputGroup.Prepend>
													<InputGroup.Text>
														<FontAwesomeIcon icon="key"/>
													</InputGroup.Text>
												</InputGroup.Prepend>
												<FormControl type="password" placeholder="Password"/>
											</InputGroup>
										</Form.Group>

										<div className="text-md-right">
											<Button variant="primary" type="submit"><FontAwesomeIcon icon="sign-in-alt"/>&nbsp;Sign In</Button>
										</div>
									</Form>

									<div className="my-2">
										<span className="font-weight-light font-italic">Don't have an account? </span>
										<Link to="/signup">Sign Up</Link>
									</div>
								</Card.Body>
							</Card>
						</div>
					</Row>
				</Container>
			</main>
		</>
	)
};