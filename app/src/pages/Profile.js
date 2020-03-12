import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {UseJwtProfileId} from "../shared/misc/JwtHelpers";

import {getAllProfiles} from "../shared/actions/get-profile";
import _ from "lodash";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Profile = ({match}) => {

	// grab the profile id from the JWT for the currently logged in account
	const currentProfileId = UseJwtProfileId();

	// Return all profiles from the redux store
	const profiles = useSelector(state => (state.profile ? state.profile : []));

	// Grab the profile off of the profiles array that matches the profileId from the URL. We're using Lodash here for now.
	// TODO: replace lodash with ES6 pls!
	const profile = _.find(profiles, {'profileId': match.params.profileId});
	console.log(profile); //check it

	const dispatch = useDispatch();

	const effects = () => {
		dispatch(getAllProfiles());
	};

	// inform react that profiles are being updated from redux
	const inputs = [profiles];
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