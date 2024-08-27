// import 'beercss'
import './Resource.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';

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
   <NavigationBar/>

{/* 

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
  <nav className="vertical">
    <label className="checkbox">
      <input type="checkbox"/>
      <span>NGO</span>
    </label>
    <label className="checkbox">
      <input type="checkbox"/>
      <span>Food Bank</span>
    </label>
    <label className="checkbox">
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
  <nav className="vertical">
    <label className="checkbox">
      <input type="checkbox"/>
      <span>Downtown Cincinnati</span>
    </label>
    <label className="checkbox">
      <input type="checkbox"/>
      <span>East</span>
    </label>
    <label className="checkbox">
      <input type="checkbox"/>
      <span>West</span>
    </label>
  </nav>
</fieldset>
</details>

</article> */}



  {serverMessage && <p className="server-message">{serverMessage}</p>}
  {serverErrors && <p className="server-error">{serverErrors}</p>}

  {/* unique key for items */}
  <h2>Resource List</h2>
     {resources.map((resource)=>(
        <ul className='resources-list'  key={resource.id}>
        <li>
        <img alt="organization-image" src={resource.display_image}></img>
        <h2>{resource.org_name}</h2>
        <p>{resource.description}</p>
        <p>{resource.location}</p>
        <a>Website: {resource.website}</a>
        </li>
        
      </ul>

     ))}


       </>

    );

} 