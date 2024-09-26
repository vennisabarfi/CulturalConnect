import { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import axios from "axios";
import './Search.css'
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import cincinnati_stock from "./cincinnati-stock.jpg";
import ReactPaginate from "react-paginate";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [eventServerMessage, setEventServerMessage] = useState('');
  const [eventServerErrors, setEventServerErrors] = useState('');
  const [pageNumber, setPageNumber] = useState(0);


  const location = useLocation();
  //Pagination options
  const searchResultsPerPage = 5; //specify how much data to show per page
  const pagesVisited = pageNumber * searchResultsPerPage;

 

  // Get current location and query from URL
  const query = new URLSearchParams(location.search).get('query');

  //default image for mapping fails
const DefaultImage = function(e){
    e.target.src= cincinnati_stock;
}


  // Fetch search results
  useEffect(function () {
    if (query) {
      try {
        axios.get(`http://localhost:3000/home/search?query=${encodeURIComponent(query)}`)
          .then(function (response) {
            setSearchResults(response.data["Results Found"]);

            if(response.data["Results Found"]=== null){
                window.location.replace("/search-404");
               
            }if (response.status === 200) {
              setEventServerMessage(response.data.message);
              console.log(response.data);
         
            }
            if(response.status != 200){
            
          
                window.location.replace("/404");
            }
          })
          .catch(function (error) {
           
            setEventServerErrors(error.response.data.message);
            console.log(`Error retrieving resources information: ${error.response.data.message}`);
          });
      } catch (error) {
        console.log("Unexpected error:", error);
      }
    }
  }, [query]);

  const pageCount = Math.ceil(searchResults.length/searchResultsPerPage)
  const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    //change document tab after search
    useEffect(function(){
      document.title = `You searched for ${query} |CincyConnect`;
    })
 

  return (
    <>
      <NavigationBar/>
    <main className="search-body">
  
    
    

        <div className="search-header">
        <h2>Search Results</h2>
        <p> <b>{searchResults.length}</b> Result(s) for <b> "{query}"</b></p>
      
        </div>
     
      {eventServerMessage && <p className="server-message">{eventServerMessage}</p>}
    {eventServerErrors && <p className="server-error">{eventServerErrors}</p>}

    <div className="search-results"> 
      {searchResults.slice(pagesVisited, pagesVisited + searchResultsPerPage).map(function (result) {
        
        return (
          <div key={result.id} className="search-card">
           
            <div className="search-container">
            <img className="search-image" alt="search-result image" src={result.display_image} onError={DefaultImage} /> 
              <h3>{result.organizer_name}</h3>
              <h3>{result.name}</h3>
              <p className="description">{result.description.substring(0,400)}..</p>

              {/* location */}
              {result.location && <span className="location"><svg className='search-location-icon' xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="30px" fill="#ED9121"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>Address: <a target="_blank" href={"http://maps.google.com/?q=" + result.location}>{result.location}</a></span>}
              <h3>Contact Information</h3>
    
                {/* Solve rendering results later */}
                { result.website && <a rel="noopener noreferrer" href={result.website}> View Listing</a>}
                {result.email && <p className="contact">Email: <a href={`mailto: ${result.email}`}>{result.email}</a></p>}
                {result.phone_number && <p className="contact">Phone Number: {result.phone_number}</p>}
                
           
            </div>
       
          </div>
        );
      })}
       
      </div>
      <div className="search-pagination">

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
     
     

      <div className="home-router">
      <a href="/"> Go back</a>
      </div>

      </main>

    <footer>
<Footer/>
</footer>

    </>
  );
}


// Bakground: creamy off white
// Headings: darker purple but still warm (orangey toned...mauve or taupe)
// links: golden orange...but darker: #ED9121
//words: still black
//green: border/shadow  for boxes... maybe line underneath #4A5D23 lighter green: #556d27
//footer: purple, buttons