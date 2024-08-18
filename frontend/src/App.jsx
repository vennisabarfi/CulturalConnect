import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import Home from "./homePage/Home";
import Login from "./loginPage/Login";

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}



export default App;
