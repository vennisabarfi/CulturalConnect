
import "./Home.css"

import NavigationBar from "../components/NavigationBar";
export default function Home(){

   
    const handleSearchSubmit = function(){

    }

    return(
        <>
    
    <main className="responsive home-body">
    <NavigationBar/>

<div className="search-title">
<h2>Cincinnati Online LGBTQ+ Directory</h2>
</div>
<div className="search-subtitle">
<h5>Find Businesses, Events and More</h5>
</div>

<div className="home-search">
  {/* <label className="search-label">Search Here</label> */}
  <form onSubmit={handleSearchSubmit}>
    <input className="search-box search-icon" placeholder="Business, Event..." type="text"></input>
    {/* <input type="submit" value="Search"></input> */}
    <button type="button" >Yep</button>
  </form>
 
</div>

{/* <div className="searchbox center wrap">
   <form onSubmit={handleSubmit}>
    {/* can add left-round or right-round */}
    {/* <input type="text" className=" search-input-1" placeholder="Business, Event..."      value={businessEvent}   onChange={handleBusinessEventChange}></input>
   
    <input type="text" className="  search-input-2" placeholder="Location..."         value={location}  onChange={handleLocationEventChange}></input>
    <button className="search-button large ">Search</button>
    </form>
</div> */} 

{/* <p className="hot-events">Hottest Events</p>

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

</div> */}

</main>

<hr/>
<footer>
<p>This is our footer. I have not added shit yet.</p>
</footer>






       </>
    );
}