import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [eventServerMessage, setEventServerMessage] = useState('');
  const [eventServerErrors, setEventServerErrors] = useState('');
  const location = useLocation();

  // Get current location and query from URL
  const query = new URLSearchParams(location.search).get('query');

  // Render <b> tag from backend using regex
  function SafeHighlight({ text }) {
    const parts = text.split(/(<b>.*?<\/b>)/);
    return (
      <span>
        {parts.map(function (part, index) {
          if (part.startsWith('<b>') && part.endsWith('</b>')) {
            const highlightedText = part.slice(3, -4);
            return <b key={index}>{highlightedText}</b>;
          }
          return part;
        })}
      </span>
    );
  }

  // Fetch search results
  useEffect(function () {
    if (query) {
      try {
        axios
          .get(`http://localhost:3000/home/search?query=${encodeURIComponent(query)}`)
          .then(function (response) {
            setSearchResults(response.data["Results Found"]);

            if (response.status === 200) {
              setEventServerMessage(response.data.message);
              console.log(response.data);
              // window.location.href = "/resources" // map this from results
            }
          })
          .catch(function (error) {
            // Add functionality to redirect to error page (404 page)
            // 404 page should be window.location.href = "/404"
            setEventServerErrors(error.response.data.message);
            console.log(`Error retrieving resources information: ${error.response.data.message}`);
          });
      } catch (error) {
        console.log("Unexpected error:", error);
      }
    }
  }, [query]);

  return (
    
    <div>
      <h4>Search Results</h4>
      {eventServerMessage && <p className="server-message">{eventServerMessage}</p>}
    {eventServerErrors && <p className="server-error">{eventServerErrors}</p>}
    
      {searchResults.map(function (result) {
        return (
          <div key={result.id} className="home-card">
            <div className="home-container">
              <h4>{result.organizer_name}</h4>
              <h4>{result.name}</h4>
              <p>
                <SafeHighlight text={result.description_headline} />
              </p>
              <p>{result.location}</p>
              {/* re-route see more to specific webpage work on this */}
            </div>
          </div>
        );
      })}
    </div>

    
  );
}
