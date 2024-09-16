
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./homePage/Home";
import './App.css'
import Business from "./businessPage/Business";
import Events from "./eventsPage/Events";
import Resource from "./resourcePage/Resource";
import Media from "./mediaPage/Media";
import Search from "./searchPage/Search";

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
          <Route path="/search" element={<Search />} />
          
        </Routes>
      </BrowserRouter>
     
 
    </>
  )
}

export default App
