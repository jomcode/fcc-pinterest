import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import root from '../modules/root';
import currentUserInfoMiddleware from '../middleware/currentuserinfo';

export default function configureStore(initialState) {
  // TODO only add devtools extension when NODE_ENV === 'development'
  const store = createStore(
    root.reducer,
    initialState,
    compose(
      applyMiddleware(thunk, currentUserInfoMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('../modules/root', () =>
        store.replaceReducer(require('../modules/root').default.reducer)
    );
  }

  return store;
}
