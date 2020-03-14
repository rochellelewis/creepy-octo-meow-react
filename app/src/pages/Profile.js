import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {UseJwtProfileId} from "../shared/misc/JwtHelpers";

import {getAllProfiles} from "../shared/actions/get-profile";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Profile = ({match}) => {

	// grab the profile id from the JWT for the currently logged in account
	const currentProfileId = UseJwtProfileId();

	// Return all profiles from the redux store
	const profiles = useSelector(state => (state.profile ? state.profile : []));

	// Grab the profile off of the profiles object that matches the profileId from the URL.
	const profile = profiles.find(function (o) {return o.profileId === match.params.profileId});
	console.log(profile); //check it!

	const dispatch = useDispatch();

	const effects = () => {
		dispatch(getAllProfiles());
	};

	const inputs = [];
	useEffect(effects, inputs);

	return (
		<>
			<main className="mh-100 d-flex align-items-center">
				<Container fluid="true" className="py-5">
					<Row>
						<Col md="5">
							<Card className="bg-transparent-90">
								<Card.Header>
									<h2 className="my-0">Hello, {profile && profile.profileUsername}!</h2>
								</Card.Header>
								<Card.Body>
									<div><span className="font-weight-bold">Username</span>: {profile && profile.profileUsername}</div>

									{/* only show the private profile data if logged into the same account! */}
									{(profile && profile.profileId === currentProfileId) && (
										<>
											<div><span className="font-weight-bold">Your Profile Id</span>: {profile && profile.profileId}</div>
											<div><span className="font-weight-bold">Your Email Address</span>: {profile && profile.profileEmail}</div>
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