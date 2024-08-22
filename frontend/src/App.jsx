
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./homePage/Home";
import './App.css'
import Business from "./businessPage/Business";

function App() {
 

  return (
    <>
  
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
        </Routes>
      </BrowserRouter>
     
 
    </>
  )
}

export default App
