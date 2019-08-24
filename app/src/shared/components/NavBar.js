import React from "react";
import {Link} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import NavDropdown from "react-bootstrap/NavDropdown";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const NavBar = () => (
	<>
		<header>
			<Navbar bg="light" expand="md" variant="light" fixed="top">
				<Link exact to="/">
					<Navbar.Brand>=^ Octo Meow 7.0 ^=</Navbar.Brand>
				</Link>
				<Navbar.Text className="small font-italic">A DDC React Demo.</Navbar.Text>
				<Navbar.Toggle aria-controls="basci-navbar-nav"></Navbar.Toggle>
				<Navbar.Collapse>
					<Nav className="ml-auto">

						<NavDropdown className="nav-link" title={"Welcome, --username--- !"}>
							<NavDropdown.Item>
								<Link className="nav-link" to="/profile">
									<FontAwesomeIcon icon="user"/>&nbsp; Profile
								</Link>
							</NavDropdown.Item>
							<div className="dropdown-divider"></div>
							<NavDropdown.Item>
								<Link className="nav-link" exact  to="/signout">
									<FontAwesomeIcon icon="sign-out-alt"/>&nbsp; Sign Out
								</Link>
							</NavDropdown.Item>
						</NavDropdown>

						<NavLink>
							<Link className="btn btn-outline-dark" exact to="/posts">
								<FontAwesomeIcon icon="cat"/>&nbsp;Posts
							</Link>
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	</>
);