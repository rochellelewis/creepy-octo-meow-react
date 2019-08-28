import React from 'react';
import {useSelector} from "react-redux";

export const GetUsername = ({profileId}) => {

	const profile = useSelector((state) => {
		//console.log(state);
		return state.profile ? state.profile.find( profile => profileId === profile.profileId) : null
	});

	return (
		<>
			{profile ? profile.profileUsername : "???"}
		</>
	);

};