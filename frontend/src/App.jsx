import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import Home from "./homePage/Home";
import Login from "./loginPage/Login";
import SignUp from "./signupPage/Signup";

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}



export default App;
