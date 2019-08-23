const proxy = require('http-proxy-middleware');
module.exports = function(app) {
	app.use(proxy('/apis', {
		logLevel: 'debug',
		target: "https://bootcamp-coders.cnm.edu/~rlewis37/creepy-octo-meow-react/public_html/",
		changeOrigin: true,
		secure: true,

	}));
};