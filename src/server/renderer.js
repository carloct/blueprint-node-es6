import React from 'react';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { App } from '../client/components/App';
import rootReducer from '../client/store/reducers';

const renderer = (req, res) => {
  const store = createStore(rootReducer, req.initialState);

  const context = {};
  // dispatch action for any initialization

  /* eslint-disable */
  const appString = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  /* eslint-enable */

  const preloadedState = store.getState();

  const helmet = Helmet.renderStatic();

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <meta name="description" content="description">
      <link rel="stylesheet" href='/static/main.css'>
      ${helmet.title.toString()}
    </head>
    <body>
      <div id="app">${appString}</div>
    </body>
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(preloadedState)}
    </script>
    <script src='/static/bundle.js'></script>
  </html>
  `;

  res.send(html);
};

export default renderer;
