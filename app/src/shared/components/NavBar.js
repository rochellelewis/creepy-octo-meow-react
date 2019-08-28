import React from "react";
import {Link} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const NavBar = () => {

	const signOut = () => {
		console.log("create signout :P");
	};

	return (
		<>
			<header>
				<Navbar bg="light" expand="md" variant="light" fixed="top">
					<Link to="/">
						<Navbar.Brand>=^ Octo Meow 7.0 ^=</Navbar.Brand>
					</Link>
					<Navbar.Text className="small font-italic d-none d-md-inline-block">A DDC React Demo.</Navbar.Text>
					<Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
					<Navbar.Collapse>
						<Nav className="ml-auto">

							<NavDropdown className="nav-link" title={"Welcome, --username--- !"}>
								<NavDropdown.Item href="/profile">
									<FontAwesomeIcon icon="user" />&nbsp; Profile
								</NavDropdown.Item>
								<div className="dropdown-divider"></div>
								<Form className="dropdown-item">
									<Button variant="outline-dark" type="submit" onClick={signOut()}>
										Sign Out&nbsp;<FontAwesomeIcon icon="sign-out-alt" />
									</Button>
								</Form>
							</NavDropdown>

							<Link className="nav-link" to="/posts">
								<Button variant="outline-dark" className="btn-block">
									<FontAwesomeIcon icon="cat" />&nbsp;Posts
								</Button>
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</header>
		</>
	)
};