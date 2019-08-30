import React, {useState, useEffect} from "react";
import * as jwtDecode from "jwt-decode";

/*
* Custom hooks to grab the jwt and decoded jwt data of a logged in user.
*
* Author: rlewis37@cnm.edu
* */

export const UseJwt = () => {
	const [jwt, setJwt] = useState(null);

	useEffect(() => {
		setJwt(window.localStorage.getItem("jwt-token"));
	});

	return jwt;
};

export const UseJwtUsername = (token) => {
	const [username, setUsername] = useState(null);

	useEffect(() => {
		if(token !== null) {
			let decodedJwt = jwtDecode(window.localStorage.getItem("jwt-token"));
			setUsername(decodedJwt.auth.profileUsername);
		}
	});

	return username;
};