import React from "react"

export const Home = () => {
	return (
		<main className="d-flex align-items-end align-items-md-center mh-80">
			<div className="container-fluid text-center text-md-left">

				<div className="row">

					<div className="col-md-6 offset-md-6 col-lg-4 offset-lg-8">
						<div className="card bg-shadow-light border-0 rounded-0">
							<div className="card-body">
								<form action="#" noValidate>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-addon"><i className="fa fa-envelope"></i></div>
											<input id="signInEmail" name="signInEmail" type="email" className="form-control"
													 placeholder="Email"></input>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-addon"><i className="fa fa-key"></i></div>
											<input id="signInPassword" name="signInPassword" type="password"
													 className="form-control" placeholder="Password"></input>
										</div>
									</div>
									<div className="text-md-right">
										<button className="btn btn-primary"><i className="fa fa-sign-in"></i>&nbsp;Sign In
										</button>
									</div>
								</form>
							</div>
						</div>

						<div className="my-2 text-white">
							<span className="font-weight-light font-italic">Don't have an account?</span>
							<button className="btn-link py-0 text-white border-0 font-weight-bold" data-toggle="modal"
									  data-target="#signUpModal">Sign up today!
							</button>
						</div>
					</div>

				</div>
			</div>
		</main>
	)
};