import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
function App() {

const [alert, setalert] = useState(null)

const showalert = (message, type)=> {
  setalert({
msg : message,
type : type,
  }
 )
 setTimeout(() => {
   setalert(null)
 }, 1500);
}

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />

          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showalert={showalert}/>} />
              <Route exact path="/signup" element={<Signup showalert={showalert}/>} />
            </Routes>

          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
