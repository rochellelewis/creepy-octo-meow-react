import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

import "./index.css";
import {NavBar} from "./shared/components/NavBar";
import {Footer} from "./shared/components/Footer";
import {Home} from "./pages/home/Home";
import {About} from "./pages/about/About";
import {Posts} from "./pages/posts/Posts";
import {FourOhFour} from "./pages/four-oh-four/FourOhFour";

const Routing = () => (
	<>

		<BrowserRouter>
			<div className="sfooter-content">
				<NavBar/>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/about" component={About}/>
					<Route exact path="/posts" component={Posts}/>
					<Route component={FourOhFour}/>
				</Switch>
			</div>
			<Footer/>
		</BrowserRouter>

	</>
);

ReactDOM.render(<Routing/>, document.querySelector('#root'));