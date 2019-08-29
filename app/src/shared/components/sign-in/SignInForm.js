import React from 'react';
import {httpConfig} from "../../misc/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

import {SignInFormContent} from "./SignInFormContent";

export const SignInForm = () => {

	const signIn = {
		signinEmail: "",
		signinPassword: ""
	};

	const validator = Yup.object().shape({
		signinEmail: Yup.string()
			.email("email must be a valid email")
			.required('email is required'),
		signinPassword: Yup.string()
			.required("Password is required")
	});

	const submitSignIn = (values, {resetForm, setStatus}) => {
		httpConfig.post("/apis/signin/", values)
			.then(reply => {
				let {message, type} = reply;
				if(reply.status === 200 && reply.headers["x-jwt-token"]) {
					window.localStorage.removeItem("jwt-token");
					window.localStorage.setItem("jwt-token", reply.headers["x-jwt-token"]);
					resetForm();
					setTimeout(() => {
						window.location = "/posts";
					}, 1500);
				}
				setStatus({message, type});
			});
	};

	return (
		<Formik
			initialValues={signIn}
			onSubmit={submitSignIn}
			validationSchema={validator}
		>
			{SignInFormContent}
		</Formik>
	)

};