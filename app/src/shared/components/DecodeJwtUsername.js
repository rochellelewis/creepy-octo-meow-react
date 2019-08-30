import React, {useState, useEffect} from "react";
import * as jwtDecode from "jwt-decode";

/*
* Utility function to decode the profileUsername of a logged in user from the JWT.
*
* This username can then be injected into the UI.
*
* See usage: app/src/shared/components/NavBar.js
*
* Author: rlewis37@cnm.edu
* */

export const DecodeJwtUsername = () => {
	const [username, setUsername] = useState(null);

	useEffect(() => {
		let decodedJwt = jwtDecode(window.localStorage.getItem("jwt-token"));
		setUsername(decodedJwt.auth.profileUsername);
	});

	return username;
};