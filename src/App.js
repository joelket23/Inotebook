import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './component/Navbar';
import { Home } from './component/Home';
import About from './component/About'
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';


function App() {
  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is alert"/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
