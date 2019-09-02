import React from 'react';
import ReactDOM from 'react-dom'
import {HashRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import reducers from "./shared/reducers";
import {Provider} from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';

import "./index.css";
import {NavBar} from "./shared/components/NavBar";
import {Footer} from "./shared/components/Footer";
import {Home} from "./pages/home/Home";
import {About} from "./pages/about/About";
import {Posts} from "./pages/posts/Posts";
import {Profile} from "./pages/profile/Profile";
import {Signup} from "./pages/signup/Signup";
import {FourOhFour} from "./pages/four-oh-four/FourOhFour";

import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab, faGithub} from "@fortawesome/free-brands-svg-icons";
import {
	fas,
	faCat,
	faEllipsisH,
	faEnvelope,
	faHeart,
	faKey,
	faPencilAlt,
	faSignInAlt,
	faSignOutAlt,
	faTrash,
	faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, fas, faCat, faEllipsisH, faEnvelope, faHeart, faGithub, faKey, faPencilAlt, faSignInAlt, faSignOutAlt, faTrash, faUser);

const store = createStore(reducers,applyMiddleware(thunk));

const Routing = (store) => (
	<>
	<Provider store={store}>
		<HashRouter>
			<div className="sfooter-content">
				<NavBar/>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/about" component={About}/>
					<Route exact path="/posts" component={Posts}/>
					<Route exact path="/signup" component={Signup}/>
					<Route exact path="/profile/:profileId" component={Profile} profileId=":profileId"/>
					<Route component={FourOhFour}/>
				</Switch>
			</div>
			<Footer/>
		</HashRouter>
	</Provider>

	</>
);

ReactDOM.render(Routing(store) , document.querySelector("#root"));