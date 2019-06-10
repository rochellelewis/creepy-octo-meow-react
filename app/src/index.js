import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

import "./index.css";
import {Home} from "./pages/home/Home";
import {About} from "./pages/about/About";
import {FourOhFour} from "./pages/four-oh-four/FourOhFour";
import {NavBar} from "./shared/components/NavBar";
import {Footer} from "./shared/components/Footer";

const Routing = () => (
	<>

		<BrowserRouter>
			<div className="sfooter-content">
				<NavBar/>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/about" component={About}/>
					<Route component={FourOhFour}/>
				</Switch>
			</div>
			<Footer/>
		</BrowserRouter>

	</>
);

ReactDOM.render(<Routing/>, document.querySelector('#root'));