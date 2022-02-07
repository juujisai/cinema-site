import './style/App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './layout/Header'
import Page from './layout/Page';
import Footer from './layout/Footer';


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
    <Router>
    <Provider store={store}>
    <div className="App">
<Header/>
<Page/>
<Footer/>
    </div>
    </Provider>
    </Router>
  );
}

export default App;
