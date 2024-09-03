
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./homePage/Home";
import './App.css'
import Business from "./businessPage/Business";
import Events from "./eventsPage/Events";
import Resource from "./resourcePage/Resource";
import Media from "./mediaPage/Media";

function App() {
 

  return (
    <>
  
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </BrowserRouter>
     
 
    </>
  )
}

export default App
