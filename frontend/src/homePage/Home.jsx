
import "./Home.css"
import Footer from "../components/Footer";
import pride_event from "./pride_event.jpg"
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import { useState, useEffect } from "react";



export default function Home(){

  const [events, setEvents] = useState([]);
  const [eventServerMessage, setEventServerMessage] = useState('');
  const [eventServerErrors, setEventServerErrors] = useState('');
   
    const handleSearchSubmit = function(){

    }

    useEffect(function(){
      async function fetchEventTopData(){
        try {
          const response = await axios.get('http://localhost:3000/event/view-top');
          setEvents(response.data["Top Events Found"])
  
          if (response.status === 200) {
  
            setEventServerMessage(response.data.message)
            console.log(response.data)
            
            
        }
        } catch (error) {
          // add functionality to redirect to error page (404 page)
          setEventServerErrors(error.response.data.message)
              
              console.log(`Error retrieving resources information: ${error.response.data.message}`)
        }
      }
      
      fetchEventTopData();
    }, []); 
  

    return(
        <>

        
    
    <main className="home-body">
    <NavigationBar/>

<div className="home-title">
<h2>Cincinnati Online LGBTQ+ Directory</h2>
</div>

<div className="home-subtitle">
<h5>Find Businesses, Events and More</h5>
</div>


<div className="home-search">
  {/* <label className="search-label">Search Here</label> */}
  <form onSubmit={handleSearchSubmit}>
    <input className="search-box search-icon" placeholder="Business, Event..." type="text"></input>
    {/* <input type="submit" value="Search"></input> */}
    <button className="search-button" type="button" >Search</button>
  </form>
 
</div>

{/* div cards to show hottest events */}
{/* Work on rendering this properly */}
{eventServerMessage && <p className="server-message">{eventServerMessage}</p>}
{eventServerErrors && <p className="server-error">{eventServerErrors}</p>}

<div className="card-header">
 <h2> Hottest Events</h2>
 <hr/>
</div>




<div  className="home-card-layout">
{events.map((event)=>(
          
          <div key={event.id} className="home-card">
          <img  className="home-card-image" alt="event-image" src={pride_event}></img>
          <div className="home-container">
              <h4>{event.organizer_name}</h4>
              <p>{event.description}</p>
              <button className="home-card-button"><a>See More</a></button>
              {/* re route see more to specific webpage work on this */}
          </div>
          </div>
      
     ))}
      </div>





<div className="card-header">
 <h2> Newest Members</h2>
 <hr/>
</div>

<div className="home-card">
  <img  className="home-card-image" alt="event-image" src={pride_event}></img>
  <div className="home-container">
      <h4>Event Name</h4>
      <p>Here is some information about an event we are planning.</p>
      <button className="home-card-button"><a>See More</a></button>
  </div>


</div>


</main>

<footer>
<Footer/>
</footer>









       </>
    );
}