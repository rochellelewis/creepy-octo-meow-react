import React, {useState} from "react";
import {httpConfig} from "../../shared/misc/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import {PostFormContent} from "./PostFormContent";

export const PostForm = () => {

	const [status, setStatus] = useState(null);

	const post = {
		postTitle: "",
		postContent: ""
	};

	const validator = Yup.object().shape({
		postTitle: Yup.string()
			.required("A title is required.")
			.max(64, "No titles longer than 64 characters."),
		postContent: Yup.string()
			.required("U gonna post something?")
			.max(2000, "2000 characters max per meow.")
	});

	const submitPost = (values, {resetForm, setStatus}) => {
		// grab jwt token to pass in headers on post request
		const headers = {
			'X-JWT-TOKEN': window.localStorage.getItem("jwt-token")
		};

		httpConfig.post("/apis/post/", values, {
			headers: headers})
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});
				if(reply.status === 200) {
					resetForm();
					/*TODO: find a better way to re-render the post component!*/
					window.location.reload();
				}
			});
	};

	return (
		<>
			<Formik
				initialValues={post}
				onSubmit={submitPost}
				validationSchema={validator}
			>
				{PostFormContent}
			</Formik>
		</>
	)
};