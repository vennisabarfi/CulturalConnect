
import "./Home.css"
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Home(){

  // const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');

  const navigate= useNavigate();
  

  const handleSubmit = function(event){
    event.preventDefault();
    if(query.trim()){
      navigate(`/search?query=${encodeURIComponent(query)}`); //navigate to search page with query included
    }
  };

  

 

    return(
        <>

        
    
    <main className="home-body">
    <NavigationBar/>

<div className="home-title">
<style>
@import url('https://fonts.googleapis.com/css2?family=Playwrite+AU+QLD:wght@100..400&display=swap');
</style>
<h1>Welcome</h1>
<h2>to</h2>
<span className="brand-name">Cincinnati</span>
<span className="brand-name">Gay Pages</span>
</div>

<div className="home-subtitle">
<h5>Find Businesses, Events and More</h5>
</div>


<div className="home-search">
  {/* <label className="search-label">Search Here</label> */}
  <form onSubmit={handleSubmit}>
    <input className="search-box search-icon" type="text" value={query} onChange={(e) => setQuery(e.target.value)}    placeholder="Business, Event..." ></input>
    {/* <input type="submit" value="Search"></input> */}
    <button className="search-button" type="submit" >Search</button>
  </form>
 
</div>


</main>

<footer>
<Footer/>
</footer>









       </>
    );
}