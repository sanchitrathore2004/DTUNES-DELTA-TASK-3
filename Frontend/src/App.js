import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./components/shared/Home";
import { useCookies } from "react-cookie";
import LoggedInHome from "./components/shared/LoggedInHome";
import UploadSongs from "./components/shared/UploadSongs";
import MyMusic from "./components/shared/MyMusic";

function App() {
  const [cookie, setCookies] = useCookies(["token"]);
  return (
        <BrowserRouter> 
        {cookie.token ? (
          //logged in routes
        <Routes>
          <Route path="/loggedin/home" element={<LoggedInHome />} />
          <Route path="*" element={<Navigate to='/loggedin/home' />}/>
          <Route path="/upload/songs" element={<UploadSongs />} />
          <Route path="/mymusic" element={<MyMusic />} />
          </Routes>
        ) : (
          <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />  
          <Route path="*" element={<Navigate to='/login' />}/>
        </Routes>
)};
        </BrowserRouter>
  );
}

export default App;
