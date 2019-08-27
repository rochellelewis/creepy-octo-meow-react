import React, {useState, useEffect}  from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getProfileByProfileId} from "../../shared/actions/get-profile";


export const GetUsername = ({profileId}) => {

	const profile = useSelector((state) => {
		console.log(state);
		return state.profile ? state.profile.find( profile => profileId === profile.profileId) : null
	});


	return (
		<>
			{profile ? profile.profileUsername : "Wrk"}
		</>
	);

};