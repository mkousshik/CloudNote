import "./App.css";
import { useState } from "react";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
        msg : message,
        type : type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route path="/home" element={<Home showAlert={showAlert}/>} />
          <Route path="/about" element={<About showAlert={showAlert}/>} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
