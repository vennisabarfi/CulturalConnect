import "beercss"
import "./Home.css"
import {useState} from 'react';

export default function Home(){

    const [businessEvent, setBusinessEvent] = useState("");
    const [location, setLocationEvent] = useState("");

    // handle user input values
    const handleBusinessEventChange = function(e){
        setBusinessEvent(e.target.value)
    }

    const handleLocationEventChange = function(e){
        setLocationEvent(e.target.value)
    }

    const handleSubmit = function(){

    }

    return(
        <>
    
    <div className="tabs">
  <a className="active">
    <i>home</i>
    <span>Home</span>
  </a>
  <a>
    <i></i>
    <span>Events</span>
  </a>
  <a>
    <i></i>
    <span>Resources</span>
  </a>
  <a>
    <i></i>
    <span>Contribute</span>
  </a>
  <a>
    <i></i>
    <span>Contact Us</span>
  </a>
  
</div>

<div className="search-title">
<h2>Cincinnati Online LGBTQ+ Directory</h2>
</div>
<div className="search-subtitle">
<h5>Find Businesses, Events and More</h5>
</div>

<div className="searchbox center">
   <form onSubmit={handleSubmit}>
    <input type="text" className="left-round search-input-1" placeholder="  Business, Event..."      value={businessEvent}   onChange={handleBusinessEventChange}></input>
   
    <input type="text" className="right-round  search-input-2" placeholder="   Location..."         value={location}  onChange={handleLocationEventChange}></input>
    <button className="search-button large">Submit</button>
    </form>
</div>


  



  

 





   
       


       </>
    );
}