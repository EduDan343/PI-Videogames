import { BrowserRouter, Switch, Route, } from "react-router-dom";
import initialPage from './components/initialPage/initialPage.jsx';
import home from './components/home/home.jsx';
import VideogameDetail from "./components/VideogameDetail/VideogameDetail.jsx";
import SearchGame from "./components/SearchGame/SearchGame.jsx";
import About from "./components/About/About.jsx";
import Form from "./components/Form/Form.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <h1>Henry Videogames</h1> */}
        <Switch>
          <Route exact path='/' component={initialPage} />
          <Route exact path='/home' component={home} />
          <Route path='/game/:id' component={VideogameDetail} />
          <Route path='/search/:game' component={SearchGame} />
          <Route path='/About' component={About} />
          <Route path='/creategame' component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
