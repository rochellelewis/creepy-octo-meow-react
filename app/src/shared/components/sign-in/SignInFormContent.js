import React from 'react';
import {Link} from "react-router-dom";

import {FormDebugger} from "../../FormDebugger";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SignInFormContent = (props) => {

	const {
		status,
		values,
		errors,
		touched,
		dirty,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset,
	} = props;

	return (
		<>
			<Card bg="transparent" className="border-0 rounded-0">
				<Card.Body>
					<Form onSubmit={handleSubmit}>

						<Form.Group>
							<Form.Label className="sr-only">Email</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>
										<FontAwesomeIcon icon="envelope"/>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									id="signinEmail"
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Email"
									type="email"
									value={values.signinEmail}
								/>
							</InputGroup>
							{
								errors.signinEmail && touched.signinEmail && (
									<div className="alert alert-danger">
										{errors.signinEmail}
									</div>
								)
							}
						</Form.Group>

						<Form.Group>
							<Form.Label className="sr-only">Password</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>
										<FontAwesomeIcon icon="key"/>
									</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									id="signinPassword"
									onChange={handleChange}
									onBlur={handleBlur}
									type="password"
									placeholder="Password"
									value={values.signinPassword}
								/>
							</InputGroup>
							{
								errors.signinPassword && touched.signinPassword && (
									<div className="alert alert-danger">
										{errors.signinPassword}
									</div>
								)
							}
						</Form.Group>

						<Form.Group className="text-md-right">
							<Button variant="primary" type="submit">
								<FontAwesomeIcon icon="sign-in-alt"/>&nbsp;Sign In
							</Button>
						</Form.Group>

						{/*for testing purposes only*/}
						{/*<FormDebugger {...props}/>*/}

					</Form>

					<div className="my-2">
						<span className="font-weight-light font-italic">Don't have an account?&nbsp;</span>
						<Link to="/signup">Sign Up</Link>
					</div>

				</Card.Body>
			</Card>

			{/* TODO: 200 ok message not visible on front end. errors ok. */}
			{console.log(status)}
			{status && (<div className={status.type}>{status.message}</div>)}
		</>
	);
};