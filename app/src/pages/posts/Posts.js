import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {PostForm} from "./PostForm";
import {PostCard} from "./PostCard";

import {UseWindowWidth} from "../../shared/misc/UseWindowWidth";
import {UseJwt} from "../../shared/misc/JwtHelpers";
import {getAllLikes} from "../../shared/actions/get-like";
import {getPostsAndProfiles} from "../../shared/actions/get-post";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";

export const Posts = () => {

	/*
	* const width holds the value of the screen width on the resize event.
	* See: UseWindowWidth
	* */
	const width = UseWindowWidth();

	// grab jwt for logged in users
	const jwt = UseJwt();

	// state variables for search terms
	const [searchQuery, setSearchQuery] = useState('');

	// handle change event for search form
	const handleChange = event => {
		setSearchQuery(event.target.value);
	};

	// Returns all posts from redux store and assigns it to the posts variable.
	const statePosts = useSelector(state => (state.posts ? state.posts : []));

	// Search filter posts based on the entered search term, the post title and post content
	const posts = statePosts.filter(post => post.postContent.includes(searchQuery) || post.postTitle.includes(searchQuery));

	// assigns useDispatch reference to the dispatch variable for later use.
	const dispatch = useDispatch();

	// Define the side effects that will occur in the application, e.g., code that handles dispatches to redux, API requests, or timers.
	// The dispatch function takes actions as arguments to make changes to the store/redux.
	const effects = () => {
		dispatch(getPostsAndProfiles());
		dispatch(getAllLikes());
	};

	// Declare any inputs that will be used by functions that are declared in sideEffects.
	const inputs = [];

	/**
	 * Pass both sideEffects and sideEffectInputs to useEffect.
	 * useEffect is what handles re-rendering of components when sideEffects resolve.
	 * E.g when a network request to an api has completed and there is new data to display on the dom.
	 **/
	useEffect(effects, inputs);

	return (
		<>
			<main className="my-5">
				<Container fluid="true" className="py-5">
					<Row className="py-3 mb-3">
						<Col md={4}>
							<h2 className="mb-0">Post A Meow</h2>
						</Col>
						<Col md={8}>
							{/* SEARCH FORM */}
							<Form inline>
								<FormLabel className="h2 mr-4">Search Posts:</FormLabel>
								<Form.Control type="text"
												  placeholder="Search"
												  id="search-text"
												  onChange={handleChange}
												  value={searchQuery}
								/>
							</Form>
						</Col>
					</Row>

					<Row>
						{/* BEGIN FORM PANEL */}
						<Col md={4} className={`posts-form-panel position-fixed ${(jwt === null && "panel-position-reset")}`}>

							{/* This nested ternary will render the PostForm only if jwt !== null,
							otherwise show signin/signup links. Then render the post form in either
							one of two different ways depending on the screen width.
							This allows the rendering of this element to be responsive. */}
							{jwt !== null ? (
								width < 768 ? (
									<Accordion defaultActiveKey="1" className="d-md-none">
										<Accordion.Toggle as={Button} variant="primary" eventKey="0" className="btn-block">
											<FontAwesomeIcon icon="pencil-alt"/>&nbsp;Write A Post
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="0">
											<PostForm/>
										</Accordion.Collapse>
									</Accordion>
									) : (
									<PostForm/>
								)
							) : (
								<Card bg="light" className="mb-3 text-center">
									<Card.Body>
										<h4 className="mb-3">Please log in to post a meow.</h4>
										<Link to="/" className="btn btn-outline-dark mr-3">Sign In</Link>
										<Link to="/signup" className="btn btn-dark">Sign Up</Link>
									</Card.Body>
								</Card>
							)}

						</Col>

						{/* BEGIN POST ITEMS */}
						<Col md={{span: 8, offset: 4}} className="posts-panel">
							{/* create an inner row for grid like layout*/}
							<Row>

								{posts.map(post =>
									<PostCard post={post} key={post.postId} />
								)}

							</Row>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
};