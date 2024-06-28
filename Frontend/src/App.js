import "./output.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./components/shared/Home";

function App() {
  return (
        <BrowserRouter> 
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;
