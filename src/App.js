import "./App.css";
import SignIn from "./components/Signin";
import Main from "./components/Main"
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Credit from "./components/Credit.js";
import SignOut from "./components/SignOut.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;