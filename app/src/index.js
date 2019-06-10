import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";

import "./index.css";
import {FourOhFour} from "./pages/four-oh-four/FourOhFour";
import {Home} from "./pages/home/Home";
import {NavBar} from "./shared/components/NavBar";
import {Footer} from "./shared/components/Footer";

const Routing = () => (
	<>

		<BrowserRouter>
			<NavBar/>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route component={FourOhFour}/>
			</Switch>
			<Footer/>
		</BrowserRouter>

	</>
);

ReactDOM.render(<Routing/>, document.querySelector('#root'));