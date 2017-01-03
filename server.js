//require babel for transpiling React JSX on the server
require('babel-register')({
    presets: ['react', 'es2015', 'stage-1']
});
//require express dependency
const express = require('express');
const app = express();
//reuquire the React Router routes
const routes = require('./routes/index.jsx');
//use the public route as a static route to be used by express
app.use(express.static('public'));
app.use(routes);
//declare the port to serve the app
const PORT = process.env.PORT || 8080;
//serve the application over the declared port
app.listen(PORT, function () {
    console.log('Serving on PORT ', PORT);
});