import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
<<<<<<< HEAD:src/components/App/App.test.js
import store from '../../store';
=======
import store from './store';
>>>>>>> master:src/App.test.js

beforeEach(() => {
  window.getSelection = () => {
    return {
      removeAllRanges: () => {},
    };
  };
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
