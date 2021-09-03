import './assets/style/main.scss'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import { Provider } from 'react-redux';
import { store } from "./store/store";

import { Header } from './cmps/Header'
import { Footer } from './cmps/Footer'

// const history = History.createBrowserHistory()

function App() {
  return (
    <div className="App">
    {/* <Router history={history}> */}
    <Router >
        <Provider store={store}>
          <header className="App-header">
            <Header></Header>
          </header>
          <main className="flex justify-c">
            <Switch>
              {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
            </Switch>
          </main>
          <Footer />
        </Provider>
      </Router>

    </div>
  );
}

export default App;
