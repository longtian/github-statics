/**
 * Created by yan on 16-2-18.
 */

console.clear();

import React from 'react';
import {render} from 'react-dom';
import App from './web_components/App';
import * as reducers from './reducers';

var element = document.createElement('div');
document.body.appendChild(element);


import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

render(<Provider store={createStore(combineReducers(reducers),applyMiddleware(thunk))}>
  <App/>
</Provider>, element);

