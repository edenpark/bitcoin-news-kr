// var PORT = process.env.PORT || 9000;
//
// require('import-export');
// require('babel-plugin-module-resolver');
// require('babel-core/register')({
//     presets: ['es2015', 'react'],
//     plugins: ["transform-class-properties", ["module-resolver", {
//         "root": ["./src"]
//     }]]
// });
//
// var express = require('express');
// var morgan = require('morgan');
// var path = require('path');
//
// var app = express();
//
// var http = require('http');
// var fs = require('fs');
// var React = require('react');
// var reactDomServer = require('react-dom/server');
// var reactRouter = require('react-router');
//
// var renderToString = reactDomServer.renderToString;
// var match = reactRouter.match,
//     RouterContext = reactRouter.RouterContext;
//
//
// var routes = require('../src/routes').default;
//
// var _require = require('react-redux'),
//     Provider = _require.Provider;
//
// var configureStore = require('../src/redux/configureStore');
//
// // Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
//
// app.server = http.createServer(app);
//
// // Serve static assets
// app.use(express.static(path.resolve(__dirname, '..', 'build')));
//
// // Always return the main index.html, so react-router render the route in the client
// app.get('*', function (req, res) {
//     var error = function error() {
//         return res.sendStatus(404);
//     };
//     var htmlFilePath = path.resolve(__dirname, '..', 'build', 'index.html');
//
//     fs.readFile(htmlFilePath, 'utf8', function (err, htmlData) {
//         if (err) {
//             res.status(500).send(error.message);
//         } else {
//             match({ routes: routes, location: req.url }, function (err, redirect, renderProps) {
//                 if (err) {
//                     error();
//                 } else if (redirect) {
//                     res.redirect(302, redirect.pathname + redirect.search);
//                 } else if (renderProps) {
//                     var store = configureStore.default();
//
//                     // const ReactApp = renderToString(react.createElement(RouterContext, renderProps));
//                     var ReactApp = renderToString(React.createElement(
//                         Provider,
//                         { store: store },
//                         React.createElement(RouterContext, renderProps)
//                     ));
//
//                     var RenderedApp = htmlData.replace('{{SSR}}', ReactApp);
//                     res.status(200).send(RenderedApp);
//                 } else {
//                     error();
//                 }
//             });
//         }
//     });
// });
//
// module.exports = app;
//
// app.listen(PORT, function () {
//     console.log('App listening on port ' + PORT + '!');
// });

require('import-export')
require('babel-core/register')({ presets: ['es2015', 'react'] })

const http = require('http')
const path = require('path')
const fs = require('fs')
const express = require('express')
const react = require('react')
const reactDomServer = require('react-dom/server')
const reactRouter = require('react-router')

const renderToString = reactDomServer.renderToString
const match = reactRouter.match
const RouterContext = reactRouter.RouterContext

const staticFiles = [
  '/static/*',
  '/logo.svg',
  '/asset-manifest.json',
  '/favicon.ico'
]

const routes = require('../src/routes').default()

const app = express()
app.server = http.createServer(app)
app.use(express.static('../build'))

staticFiles.forEach(file => {
  app.get(file, (req, res) => {
    const filePath = path.join( __dirname, '../build', req.url )
    res.sendFile( filePath )
  })
})

app.get('*', (req, res) => {

  const error = () => res.status(404).send('404')
  const htmlFilePath = path.join( __dirname, '../build', 'index.html' )

  fs.readFile( htmlFilePath, 'utf8', (err, htmlData) => {
    if(err) {
      error()
    }
    else {
      match({ routes, location: req.url }, (err, redirect, ssrData) => {
        if(err) {
          error()
        }
        else if(redirect) {
          res.redirect(302, redirect.pathname + redirect.search)
        }
        else if(ssrData) {
          const ReactApp = renderToString( react.createElement(RouterContext, ssrData) )
          const RenderedApp = htmlData.replace('{{SSR}}', ReactApp)
          res.status(200).send(RenderedApp)
        }
        else {
          error()
        }
      })
    }
  })
})

app.server.listen( process.env.PORT || 8080 )
console.log(`Listening on http://localhost:${app.server.address().port}`)
