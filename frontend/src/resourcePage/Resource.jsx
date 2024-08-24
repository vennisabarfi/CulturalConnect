import 'beercss'
import './Resource.css'


export default function Resource(){
    return(
        <>
   <div className="tabs">
  <a href="/">
    <i>home</i>
    <span>Home</span>
  </a>
  <a href="/events">
    <i></i>
    <span>Events</span>
  </a>
  <a className=" active dropdown" href="/resources" onClick={(e) => e.preventDefault()}>
    <span className="dropdown-trigger">
      <i></i>
      <span>Resources</span>
      <i></i>
    </span>
    <div className="dropdown-menu wrap">
      <a href="#option1">Non-Profit Organizations</a>
      <a href="#option2">Shelters</a>
      <a href="#option3">Food Banks</a>
    </div>
  </a>
  <a href="/contribute">
    <i></i>
    <span>Contribute</span>
  </a>
  <a href="/contact">
    <i></i>
    <span>Contact Us</span>
  </a>

</div>




<article className='filter-area'>
    <span className='filter-text'>Filter</span>
    <div className="space"></div>

<span className='search-text'>Search</span>
<div className="field medium prefix round fill">
  <i className="front">search</i>
  <input placeholder='Look up resources...'/>
  
</div>
<details className='type-filter'>
    <summary>Type</summary>
    <fieldset>
  <legend>Select one or more</legend>
  <nav class="vertical">
    <label class="checkbox">
      <input type="checkbox"/>
      <span>NGO</span>
    </label>
    <label class="checkbox">
      <input type="checkbox"/>
      <span>Food Bank</span>
    </label>
    <label class="checkbox">
      <input type="checkbox"/>
      <span>Shelter</span>
    </label>
  </nav>
</fieldset>
</details>

<details className='type-filter'>
    <summary>Location</summary>
    <fieldset>
  <legend>Select one or more</legend>
  <nav class="vertical">
    <label class="checkbox">
      <input type="checkbox"/>
      <span>Downtown Cincinnati</span>
    </label>
    <label class="checkbox">
      <input type="checkbox"/>
      <span>East</span>
    </label>
    <label class="checkbox">
      <input type="checkbox"/>
      <span>West</span>
    </label>
  </nav>
</fieldset>
</details>




</article>



       </>

    );

}