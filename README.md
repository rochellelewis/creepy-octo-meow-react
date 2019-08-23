# creepy-octo-meow-react
Demo app using the Deep Dive Bootcamp toolkit.

https://bootcamp-coders.cnm.edu/~rlewis37/creepy-octo-meow-react/

## React SpinUp - Adding React To an Existing Project
### React Spinup must be completed by one member of the team but it is recommended that it is done as a group with the rest of the team members  watching/looking for missing semi colons.
1. cd into the project and run `npx create-react-app app`
2. add the following packages to package.json under **"dependencies"**
```
"@fortawesome/fontawesome-svg-core": "^1.2.19",
"@fortawesome/free-solid-svg-icons": "^5.9.0",
"@fortawesome/react-fontawesome": "^0.1.4",
"axios": "^0.18.1",
"bootstrap": "^4.3.1",
"http-proxy-middleware": "^0.19.1",
"jquery": "^3.4.1",
"popper": "^1.0.1",
"react": "^16.8.6",
"react-dom": "^16.8.6",
"react-redux": "^7.1.0",
"react-router": "latest",
"react-router-dom": "^5.0.1",
"react-scripts": "3.0.1",
"redux": "^4.0.1",
"redux-thunk": "^2.3.0"
```
3. run `npm install` in the /app directory
4. delete every file in `app/src`
5. create a new file called `app/src/index.js` and add the content below:
```
import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => ( <h1 className="text-info">hello world</h1> );
ReactDOM.render(<App/>, document.querySelector('#root'));
```
* __Optional__ run `npm start` in `/app` to see if the setup was successful
## Setting up the Dev Server.
1. add `/app/src/setupProxy.js` to the `/.gitignore` file
2. create the file `/app/src/setupProxy.js` and add the content below
	* make sure to update the file to match your _username_ and _project_. Each team member must do this step!
```
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
	app.use(proxy('/apis', {
		logLevel: 'debug',
		target: "https://bootcamp-coders.cnm.edu/~username/project/php/public_html/",
		changeOrigin: true,
		secure: true,

	}));
};
```
## Add React Router To The project
1. Create a new Component file called **Home.js** in `/app/src/pages`
2. Add the content below to the file:
```
import React from "react"

export const Home = () => {
	return (
		<>
			<h1>Home</h1>
		</>
	)
}
```
3. create a new Component file called **FourOhFour.js** in `/app/src/pages`
add the content below to the file:
```
import React from "react"

export const FourOhFour = () => {
	return (
		<>
			<h1>Y U NO FIND</h1>
		</>
	)
};

```
4. Inside **app/src/index.js** replace the following...
 ```
 import React from 'react';
 import ReactDOM from 'react-dom'
 import 'bootstrap/dist/css/bootstrap.css';
 import 'bootstrap/dist/js/bootstrap.bundle.min';
 
 
 const App = () => (<h1 className="text-info">hello world</h1>);
 ReactDOM.render(<App/>, document.querySelector('#root'));
 ```
 
 with this:
```
import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {FourOhFour} from "./pages/FourOhFour";
import {Home} from "./pages/Home";

const Routing = () => (
	<>

		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route component={FourOhFour}/>
			</Switch>
		</BrowserRouter>

	</>
);
ReactDOM.render(<Routing/>, document.querySelector('#root'));

```