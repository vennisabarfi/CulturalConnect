import { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import axios from "axios";
import './Search.css'
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [eventServerMessage, setEventServerMessage] = useState('');
  const [eventServerErrors, setEventServerErrors] = useState('');
  const location = useLocation();

  // Get current location and query from URL
  const query = new URLSearchParams(location.search).get('query');

  

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

  return (
    <>
    <NavigationBar/>
    
    

        <div className="search-header">
        <h2>Search Results</h2>
        <p> <b>{searchResults.length}</b> Result(s) for <b>"{query}"</b></p>
      
        </div>
     
      {eventServerMessage && <p className="server-message">{eventServerMessage}</p>}
    {eventServerErrors && <p className="server-error">{eventServerErrors}</p>}

    <div className="search-results"> 
      {searchResults.map(function (result) {
        
        return (
          <div key={result.id} className="search-card">
           
            <div className="search-container">
              <h3>{result.organizer_name}</h3>
              <h3>{result.name}</h3>
              {/* <img>{result.display_image}</img> */}
             <p>{result.description.substring(0,250)}..</p>
              <p>{result.location}</p>
              <h4>Contact Information</h4>
              <a href={result.website}>{result.website}</a>
              <p>{result.phone_number}</p>
              <p>{result.email}</p>
            </div>
   
          </div>
        );
      })}
      </div>

      <div className="home-router">
      <a href="/"> Go back</a>
      </div>

   

    <footer>
<Footer/>
</footer>

    </>
  );
}
