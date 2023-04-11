import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import  Home  from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() {
  const [Alerttext,setAlerttext] = useState(null)
  const showAlert = (message, type) => {
    setAlerttext({
        msg: message,
        Type: type
    })
    setTimeout(()=>{
      setAlerttext(null)
    },1500)
  }
  return (
    <>
    <NoteState>
      <Router>
        <NavBar />
        <Alert alert= {Alerttext}/>
        <div className="container">
  
          <Routes>
            <Route exact path="/" element={<Home  showAlert={showAlert} />} />  
            <Route exact path="/about" element={<About />} /> 
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} /> } />
            
          </Routes>
        </div>
      </Router>
     </NoteState>
    </>
  );
}

export default App;
