import React from "react";

import {FormDebugger} from "../../shared/FormDebugger";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const PostFormContent = (props) => {

	const {
		submitStatus,
		status,
		values,
		errors,
		touched,
		dirty,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset
	} = props;

	return (
		<>
			<Card bg="light" className="mb-3">
				<Card.Body>
					<Form onSubmit={handleSubmit}>

						<Form.Group>
							<Form.Label className="sr-only">Post Title</Form.Label>
							<InputGroup>
								<FormControl
									id="postTitle"
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Post Title"
									type="text"
									value={values.postTitle}
								/>
							</InputGroup>
							{
								errors.postTitle && touched.postTitle && (
									<div className="alert alert-danger">
										{errors.postTitle}
									</div>
								)
							}
						</Form.Group>

						<Form.Group>
							<Form.Label className="sr-only">Post Content</Form.Label>
							<InputGroup>
								<FormControl
									id="postContent"
									as="textarea"
									rows="5"
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Your opinion here..."
									value={values.postContent}
								/>
							</InputGroup>
							{
								errors.postContent && touched.postContent && (
									<div className="alert alert-danger">
										{errors.postContent}
									</div>
								)
							}
						</Form.Group>

						<Form.Group>
							<Button variant="primary" type="submit" className="mr-2">Meow!</Button>
							<Button variant="outline-dark" type="reset" onClick={handleReset}>Reset</Button>
						</Form.Group>

						{/*for testing purposes only*/}
						{/*<FormDebugger {...props}/>*/}

					</Form>
				</Card.Body>
			</Card>

			{console.log(status)}
			{status && (<div className={status.type}>{status.message}</div>)}
		</>
	)
};