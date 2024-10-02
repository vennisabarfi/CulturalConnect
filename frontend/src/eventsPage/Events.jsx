
import './Events.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { InstagramEmbed } from 'react-social-media-embed';
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function Events(){
  const [eventstypes, setEventsTypes] = useState([]);
  const [serverMessage, setServerMessage] = useState('');
  const [serverErrors, setServerErrors] = useState('');



  useEffect(function(){
    async function fetchBusinessByTypeData(){
      try {
        const response = await axios.get('http://localhost:3000/business/view/planners');
        setEventsTypes(response.data["Businesses Found"]);
        

        if (response.status === 200) {

          setServerMessage(response.data.message)
          console.log(response.data)
          
          
      }
      } catch (error) {
        // add functionality to redirect to error page (404 page)
        setServerErrors(error.response.data.message)
            
            console.log(`Error retrieving businesses by type information: ${error.response.data.message}`)
      }
    }
    
    fetchBusinessByTypeData();
  }, []); 

    return(
        <>
  <NavigationBar/>

  <div className='events-header'>
  <h4>Events</h4>
  <hr/>
  <span>Newest Events!</span>
  <p>Swipe to see more </p>
 
  </div>
    
  <div className='hottest-events'>
 
  <span><InstagramEmbed url="https://www.instagram.com/reel/DAMMdjMvLbG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" width={328} /></span>
  <span><InstagramEmbed url="https://www.instagram.com/reel/DAMMdjMvLbG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" width={328} /></span>
  <span><InstagramEmbed url="https://www.instagram.com/reel/DAMMdjMvLbG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" width={328} /></span>
  </div>

  <div className='cincy-planners'>
    <span>Cincy party planners</span>
      <div className='cincy-planner'>
      {eventstypes.map(eventstype=>(
        <ul className='cincy-planners-list'  key={eventstype.id}>
        <li>
        <img className="cincy-planners-image" alt="organization-image" src={eventstype.display_image}></img>
        <h2>{eventstype.org_name}</h2>
        <span> Visit Page<a href={eventstype.website} target="_blank" rel="noopener noreferrer"></a> </span>
        </li>
        
      </ul>

     ))}

      </div>
  </div>



 

  <footer>
    <Footer/>
  </footer>




    
        </>
    );
}