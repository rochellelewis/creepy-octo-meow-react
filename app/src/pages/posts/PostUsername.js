import React from 'react';
import {useSelector} from "react-redux";

export const PostUsername = ({profileId}) => {

	const profile = useSelector((state) => {
		return state.profile ? state.profile.find(profile => profileId === profile.profileId) : null
	});

	return (
		<>
			{profile ? profile.profileUsername : "???"}
		</>
	);

};