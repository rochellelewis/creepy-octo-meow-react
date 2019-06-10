import React from "react";

export const NavBar = () => (
	<header>
		<nav className="navbar navbar-expand-lg navbar-dark">
			<a className="navbar-brand"
				href="https://bootcamp-coders.cnm.edu/~rlewis37/meow-app-5/static-ui/home-view.php">=^ Meow App 6.0 ^=</a>
			<small className="d-none d-md-inline-block text-muted mr-auto"><em>An Reactastic Demo.</em></small>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
							data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Hello, username
						</a>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<a className="dropdown-item" href="#"><i className="fa fa-user"></i>&nbsp;&nbsp;My Profile</a>
							<a className="dropdown-item" href="posts-view.php"><i className="fa fa-pencil"></i>&nbsp;&nbsp;New
								Post</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="#"><i className="fa fa-sign-out"></i>&nbsp;&nbsp;Sign Out</a>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	</header>
);