import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";
import {getProfileByProfileId} from "../../shared/actions/get-profile";

export const Profile = ({match}) => {

	// Return the profile by profileId from the redux store
	const profile = useSelector(state => (state.profile ? state.profile[0] : []));

	const dispatch = useDispatch();

	const effects = () => {
		dispatch(getProfileByProfileId(match.params.profileId));
	};

	const inputs = [match.params.profileId];
	useEffect(effects, inputs);

	return (
		<>
			<main className="mh-80 mt-5 py-5 d-flex align-items-center">
				<Container fluid="true">
					<Row>
						<Col md="8">
							<Card bg="light">
								<Card.Header>
									<h2 className="my-0">Hello, {profile && profile.profileUsername}!</h2>
								</Card.Header>
								<Card.Body>
									<div>Your Email: {profile && profile.profileEmail}</div>
									<div>Your Username: {profile && profile.profileUsername}</div>
									<div>Your Activation Token: {(profile) && profile.profileActivationToken}</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
};