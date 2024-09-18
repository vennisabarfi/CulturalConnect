// import 'beercss'
import './Resource.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import ngo_stock from "./ngo_stock.jpg"
import ReactPaginate from 'react-paginate';
// import Pagination from '../components/Pagination';

export default function Resource(){
    const [resources, setResources] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const [serverErrors, setServerErrors] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const[filter, setFilter] = useState('');
    const [checked, setChecked] = useState(new Set()); //using a set so you can filter multiple items, else use ''

    //filter by organization name or location. add input debouncing to avoid crashes
    const filteredResources = resources.filter((resource)=>{
      const matchesText = 
      resource.org_name.toLowerCase().includes(filter.toLowerCase()) ||
      resource.location.toLowerCase().includes(filter.toLowerCase()) 

      const matchesType = checked.size ===0 || checked.has(resource.type);
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
  


    const resourcesPerPage = 10; //specify how much data to show per page
    const pagesVisited = pageNumber * resourcesPerPage;

  useEffect(function(){
    async function fetchResourceData(){
      try {
        const response = await axios.get('http://localhost:3000/resource/view');
        setResources(response.data["Resources Found"]);
        

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

  //pagination
  const pageCount = Math.ceil(resources.length/resourcesPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //filter handlers


  

    return(
        <>
   <NavigationBar/>



      {/* style this properly */}
  {serverMessage && <p className="server-message">{serverMessage}</p>}
  {serverErrors && <p className="server-error">{serverErrors}</p>}

      {/* Placing resource results and filter component in flexbox */}
  <div className='resource-header'>
  <h4>Resource List</h4>
  <hr/>
  </div>
  <div className='resources-results'>
    {/* even though usually resources.map since we are paginating only want to show the limit of */}
     {filteredResources.slice(pagesVisited, pagesVisited + resourcesPerPage).map((resource)=>(
        <ul className='resources-list'  key={resource.id}>
        <li>
        <img className="resources-image" alt="organization-image" src={ngo_stock}></img>
        <h2>{resource.org_name}</h2>
        <p>{resource.description}</p>
        <p>{resource.type}</p>
        <p className='resource-location'><svg className='location-icon' xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>{resource.location}</p>
        <span> Website:<a href={resource.website} target="_blank" rel="noopener noreferrer"> {resource.website}</a> </span>
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
    <p>Search for Resources</p>
    {/* input search box */}
    <input type="text" value={filter}  placeholder='Search...' onChange={handleFilterChange}/>
    {/* Checkbox for filtering  .. NGO, Sexual Health, Other?*/}
    <br/>
    <br/>
    <p>Filter Resources by Type</p>
    <input type='checkbox' value="Non-Governmental Organization" id="checkbox-1" onChange={handleCheckedChange} checked={checked.has("Non-Governmental Organization")}/>
    <label>Non-Governmental Organization</label>
    <input type='checkbox' value="Environmental" id="checkbox-2" onChange={handleCheckedChange} checked={checked.has("Environmental")}/>
    <label>Environmental</label>
  </div>


  {/* implement react-paginate for results. do the same for search results page */}

     <footer><Footer/></footer>


       </>

    );

} 