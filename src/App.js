import './style/App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'

import {moviesReducer} from './redux/reducers/moviesReducer'

const rootReducer = combineReducers({
movies: moviesReducer
})

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
)


function App() {
  return (
    <Provider store={store}>
    <div className="App">
app     
    </div>
    </Provider>
  );
}

export default App;
