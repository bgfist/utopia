import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';



const reducer = (state, action) => {
  switch (action.type) {
   
    default:
      return state
  }
}

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools()
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState);
};