
import "./Home.css"
import Footer from "../components/Footer";
import pride_event from "./pride_event.jpg"
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import { useState, useEffect } from "react";



export default function Home(){

  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [eventServerMessage, setEventServerMessage] = useState('');
  const [eventServerErrors, setEventServerErrors] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // handling form data with query
  const handleSubmit = async function(event){
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/home/search?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data["Results Found"])
      
      //fix the object Object error
      //Next step is to store these results in a prop and then redirect to the results page where you show these results
      // use either prop drilling or createContext or Redux/MobX

      if (response.status === 200) {

        setEventServerMessage(response.data.message)
        console.log(response.data)
        // window.location.href="/resources" //map this from results
        
    }
    } catch (error) {
      // add functionality to redirect to error page (404 page)
      // 404 page should be window.location.href = "/404"
      setEventServerErrors(error.response.data.message)
          
          console.log(`Error retrieving resources information: ${error.response.data.message}`)
    }

  }

    // handle event top data
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
  <form onSubmit={handleSubmit}>
    <input className="search-box search-icon" type="text" value={query} onChange={(e) => setQuery(e.target.value)}    placeholder="Business, Event..." ></input>
    {/* <input type="submit" value="Search"></input> */}
    <button className="search-button" type="submit" >Search</button>
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


<div>
  <h4>Search Results</h4>
  {searchResults.map((result)=>(
          
          <div key={result.id} className="home-card">
          <div className="home-container">
              <h4>{result.organizer_name}</h4>
              <h4>{result.name}</h4>
              <p>{result.description_headline}</p>
              <p>{result.location}</p>
              {/* re route see more to specific webpage work on this */}
          </div>
          </div>
      
     ))}
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