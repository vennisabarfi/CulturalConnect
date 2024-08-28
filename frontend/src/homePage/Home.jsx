
import "./Home.css"
import Footer from "../components/Footer";
import pride_event from "./pride_event.jpg"
import NavigationBar from "../components/NavigationBar";
export default function Home(){

   
    const handleSearchSubmit = function(){

    }

    return(
        <>
    
    <main className="responsive home-body">
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

<div className="card-header">
 <h2> Hottest Events</h2>
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