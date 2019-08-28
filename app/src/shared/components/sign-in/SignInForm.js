import React, {useState} from 'react';
import {httpConfig} from "../../misc/http-config";
import {Formik} from "formik";
import * as Yup from "yup";

import {SignInFormContent} from "./SignInFormContent";

export const SignInForm = () => {

	const signIn = {
		signinEmail: "",
		signinPassword: ""
	};

	const [status, setStatus] = useState(null);

	const validator = Yup.object().shape({
		signinEmail: Yup.string()
			.email("email must be a valid email")
			.required('email is required'),
		signinPassword: Yup.string()
			.required("Password is required")
	});

	const submitSignIn = (values, {resetForm}) => {
		httpConfig.post("/apis/signin", values)
			.then(reply => {
				let {message, type} = reply;
				setStatus({message, type});
				if(reply.status === 200) {
					resetForm();
				}
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