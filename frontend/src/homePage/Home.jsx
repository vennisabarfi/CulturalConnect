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
    
    <main className="responsive home-body">
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
    <button className="search-button large">Search</button>
    </form>
</div>

<p className="hot-events">Hottest Events</p>

<div className="grid-container">

<article className="no-padding">
  <div className="grid no-space">
    <div className="s6">
      <img className="responsive" src="/beer-and-woman.svg"/>
    </div>
    <div className="s6">
      <div className="padding">
        <h5>Title</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <button className="border round">See More</button>
        </nav>
      </div>
    </div>
  </div>
</article>

    <article className="no-padding">
  <div className="grid no-space">
    <div className="s6">
      <img className="responsive" src="/beer-and-woman.svg"/>
    </div>
    <div className="s6">
      <div className="padding">
        <h5>Title</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <button className="border round">See More</button>
        </nav>
      </div>
    </div>
  </div>
</article>

<article className="no-padding">
  <div className="grid no-space">
    <div className="s6">
      <img className="responsive" src="/beer-and-woman.svg"/>
    </div>
    <div className="s6">
      <div className="padding">
        <h5>Title</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <button className="border round">See More</button>
        </nav>
      </div>
    </div>
  </div>
</article>

</div>

<p className="hot-events">Newest Members</p>

<div className="grid-container">

<article className="no-padding">
  <div className="grid no-space">
    <div className="s6">
      <img className="responsive" src="/beer-and-woman.svg"/>
    </div>
    <div className="s6">
      <div className="padding">
        <h5>Title</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <button className="border round">See More</button>
        </nav>
      </div>
    </div>
  </div>
</article>

    <article className="no-padding">
  <div className="grid no-space">
    <div className="s6">
      <img className="responsive" src="/beer-and-woman.svg"/>
    </div>
    <div className="s6">
      <div className="padding">
        <h5>Title</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <button className="border round">See More</button>
        </nav>
      </div>
    </div>
  </div>
</article>

<article className="no-padding">
  <div className="grid no-space">
    <div className="s6">
      <img className="responsive" src="/beer-and-woman.svg"/>
    </div>
    <div className="s6">
      <div className="padding">
        <h5>Title</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <nav>
          <button className="border round">See More</button>
        </nav>
      </div>
    </div>
  </div>
</article>

</div>

</main>

<hr/>
<footer>
<p>This is our footer. I haven't added shit yet.</p>
</footer>






       </>
    );
}