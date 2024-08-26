import 'beercss'
import './Resource.css'
import axios from 'axios'
import { useState, useEffect } from 'react';



export default function Resource(){
    const [resources, setResources] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const [serverErrors, setServerErrors] = useState('');

  useEffect(function(){
    async function fetchResourceData(){
      try {
        const response = await axios.get('http://localhost:3000/resource/view');
        setResources(response.data["Resources Found"])

        if (response.status === 200) {

          setServerMessage(response.data.message)
          console.log(response.data)
          
          
      }
      } catch (error) {
        // add functionality to redirect to error page (404 page)
        setServerErrors(error.response.data.message)
            
            console.log(`Error retrieving resources information: ${error.response.data.message}`)
      }
    }
    
    fetchResourceData();
  }, []); 

 

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

<h2>Resource List</h2>

  {serverMessage && <p className="server-message">{serverMessage}</p>}
  {serverErrors && <p className="server-error">{serverErrors}</p>}

  {/* unique key for items */}
  
     {resources.map((resource)=>(
        <ul className='resources-list'  key={resource.id}>
        <li>
        <h1>{resource.org_name}</h1>
        <p>{resource.description}</p>
        <p>{resource.location}</p>
        <p>Website: {resource.website}</p>
        </li>
        
      </ul>

     ))}


       </>

    );

}