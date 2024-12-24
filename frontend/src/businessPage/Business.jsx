// import 'beercss'
import './Business.css'; 
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import ReactPaginate from 'react-paginate';
// import Pagination from '../components/Pagination';
import { BACKEND_API } from '../Constants';

export default function Business(){
    const [businesses, setBusinesses] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const [serverErrors, setServerErrors] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const[filter, setFilter] = useState('');
    const [checked, setChecked] = useState(new Set()); //using a set so you can filter multiple items, else use ''
    const [debouncedFilter, setDebouncedFilter] = useState(filter); //debouncing results
  
    

    //filter by organization name or location. add input debouncing to avoid crashes
    const filteredBusinesses = businesses.filter((business)=>{
      const matchesText = 
      business.business_name.toLowerCase().includes(filter.toLowerCase()) ||
      business.location.toLowerCase().includes(filter.toLowerCase()) ||
      business.description.toLowerCase().includes(filter.toLowerCase())

      const matchesType = checked.size === 0 || checked.has(business.service_type);
      return matchesText && matchesType
    });

    //Filter by type of resource
  const handleFilterChange = function(e){
    setFilter(e.target.value);
    
  }

  // handle check box
  const handleCheckedChange = function (e) {
    const newFilters = new Set(checked);
    if (e.target.checked) {
      newFilters.add(e.target.value); // Add the value if checked
    } else {
      newFilters.delete(e.target.value); // Remove the value if unchecked
    }
    setChecked(newFilters); // Update the state
  };
  


    const businessesPerPage = 10; //specify how much data to show per page
    const pagesVisited = pageNumber * businessesPerPage;

  useEffect(function(){
    async function fetchResourceData(){
      try {
        const response = await axios.get(`${BACKEND_API}/business/view`);
       
        setBusinesses(response.data["Businesses Found"]);

        

        if (response.status === 200) {

          setServerMessage(response.data.message)
          
          
          
      }
      } catch (error) {
        // add functionality to redirect to error page (404 page)
        setServerErrors(error.response.data.message)
            
            console.log(`Error retrieving businesses information: ${error.response.data.message}`)
      }
    }
    
    fetchResourceData();
  }, []); 

  //pagination
  const pageCount = Math.ceil(businesses.length/businessesPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Debounce effect: Update `debouncedFilter` after a delay when `filter` changes
  useEffect(function(){
    const handler = setTimeout(() => {
      setDebouncedFilter(filter); // Only update after the delay
    }, 500); // 500ms delay

    // Cleanup the timeout if the component is re-rendered before the timeout completes
    return function(){
      clearTimeout(handler);
    };
  }, [filter]); // The effect runs every time `filter` changes

console.log(debouncedFilter); //to test


//filter component
function iconMovePodcast() {
  const icon = document.getElementById('arrow-icon-1');
  const filter_box = document.getElementById('mobile-filter-box');
  const checkbox = document.getElementById('mobile-filter-checkbox');

  if (icon.style.transform === 'rotate(90deg)') {
    icon.style.transform = 'rotate(0deg)'; // Rotate to 0 degrees
    filter_box.style.display = 'block';    // Show filter box
    checkbox.style.display = 'block';      // Show checkbox
  } else {
    icon.style.transform = 'rotate(90deg)'; // Rotate to 90 degrees
    filter_box.style.display = 'none';      // Hide filter box
    checkbox.style.display = 'none';        // Hide checkbox
  }
}



    return(
        <>
        
         <main className="resource-body">
         <NavigationBar/>
 
   
   



      {/* style this properly */}
  {serverMessage && <p className="server-message">{serverMessage}</p>}
  {serverErrors && <p className="server-error">{serverErrors}</p>}



  <div className='resource-header'>
  <h4>LGBTQ+ Friendly Businesses</h4>
  <hr/>
  </div>

  {/* Mobile/Smaller Screen Responsive Filter */}
  
  <div className='toggle-filter'> <span>Filter Businesses</span> <svg onClick={iconMovePodcast} id="arrow-icon-1" className="filter-arrow" fill="rgb(139, 21, 84);" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" style={{ transform: 'rotate(90deg)' }}><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
  </div>
  <div id='mobile-filter-box' className='mobile-filter-box'>
    {/* input search box */}
    <input type="text" className='mobile-filter-search-box' value={filter}  placeholder='Find businesses near you...' onChange={handleFilterChange}/>
    {/* Checkbox for filtering  .. NGO, Sexual Health, Other?*/}
   
    <br/>
    <p>Filter Resources by Type</p>
    </div>
   
    <div id = 'mobile-filter-checkbox' className='mobile-filter-checkbox'> 
    <input type='checkbox' value="planners" id="checkbox-1" onChange={handleCheckedChange} checked={checked.has("planners")}/>
    <label>Event Planners</label>
    <br/>
    <input type='checkbox' value="Restaurant/Bar" id="checkbox-2" onChange={handleCheckedChange} checked={checked.has("Restaurant/Bar")}/>
    <label>Restaurant/Bar</label>
    <br/>
    <input type='checkbox' value="Nightlife" id="checkbox-2" onChange={handleCheckedChange} checked={checked.has("Nightlife")}/>
    <label>Nightlife</label>
    </div>


      <div className='resource-container'>
      {/* Placing resource results and filter component in flexbox */}

  <div className='resources-results'>
    {/* even though usually resources.map since we are paginating only want to show the limit of */}
     {filteredBusinesses.slice(pagesVisited, pagesVisited + businessesPerPage).map((business)=>(
        <ul className='resources-list'  key={business.id}>
        <li>
        <img className="resources-image" alt="organization-image" src={business.display_image} ></img>
        <h2>{business.business_name}</h2>
        <p>{business.description}</p>
        <p>Type: {business.service_type}</p>
        <p className='resource-location'><svg className='location-icon' xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg><a target="_blank" href={"http://maps.google.com/?q=" + business.location} >{business.location}</a></p>
        <span> Website:<a href={business.website} target="_blank" rel="noopener noreferrer"> {business.website}</a> </span>
        {business.email && <p className="contact">Email: <a href={`mailto: ${business.email}`}>{business.email}</a></p>}
        </li>
        
      </ul>

     ))}
     <ReactPaginate
       previousLabel={"Previous"}
       nextLabel={"Next"}
       pageCount={pageCount}
       onPageChange={changePage}
       containerClassName={"paginationBttns"}
       previousLinkClassName={"previousBttn"}
       nextLinkClassName={"nextBttn"}
      //  disabledClassName={"paginationDisabled"} removed for now
       activeClassName={"paginationActive"}
     />
  </div>

  <div className='filter-box'>
    <p>Search for Businesses</p>
    {/* input search box */}
    <input type="text" className='filter-search-box' value={filter}  placeholder='Find businesses near you...' onChange={handleFilterChange}/>
    {/* Checkbox for filtering  .. NGO, Sexual Health, Other?*/}
    <br/>
    <br/>
    <p>Filter Businesses by Type</p>
    <input type='checkbox' value="Event Planners" id="checkbox-1" onChange={handleCheckedChange} checked={checked.has("Event Planners")}/>
    <label>Event Planners</label>
    <br/>
    <input type='checkbox' value="Restaurant/Bar" id="checkbox-2" onChange={handleCheckedChange} checked={checked.has("Restaurant/Bar")}/>
    <label>Restaurant/Bar</label>
    <br/>
    <input type='checkbox' value="Nightlife" id="checkbox-2" onChange={handleCheckedChange} checked={checked.has("Nightlife")}/>
    <label>Nightlife</label>
  </div>

  </div>

  </main>

 

     <footer><Footer/></footer>


       </>

    );

} 
