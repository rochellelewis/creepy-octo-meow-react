import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {UseJwtProfileId} from "../../shared/misc/JwtHelpers";

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

	// grab the profile id from the currently logged in account, or null if not found
	const currentProfileId = UseJwtProfileId();

	// Return the profile by profileId from the redux store
	//TODO: fix this. Prob grabbing profile[0] from profiles loaded in Posts! Match the currentProfileId to find/match profile by profileId on the profiles already in redux store?
	const profile = useSelector(state => (state.profile ? state.profile[0] : []));
	console.log(profile);

	const dispatch = useDispatch();

	const effects = () => {
		dispatch(getProfileByProfileId(match.params.profileId));
	};

	const inputs = [match.params.profileId];
	useEffect(effects, inputs);

	return (
		<>
			<main className="mh-100 d-flex align-items-center">
				<Container fluid="true" className="py-5">
					<Row>
						<Col md="8">
							<Card bg="light">
								<Card.Header>
									<h2 className="my-0">Hello, {profile && profile.profileUsername}!</h2>
								</Card.Header>
								<Card.Body>
									<div>Username: {profile && profile.profileUsername}</div>

									{/* only show the private profile data if logged into the same account! */}
									{(profile && profile.profileId === currentProfileId) && (
										<>
											<div>Your Profile Id: {profile && profile.profileId}</div>
											<div>Your Email Address: {profile && profile.profileEmail}</div>
											<div>Your Activation Token: {(profile) && profile.profileActivationToken}</div>
										</>
									)}

								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
};