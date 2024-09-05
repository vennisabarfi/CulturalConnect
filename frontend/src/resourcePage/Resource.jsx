// import 'beercss'
import './Resource.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import ngo_stock from "./ngo_stock.jpg"
import Pagination from '../components/Pagination';

export default function Resource(){
    const [resources, setResources] = useState([]);
    const [serverMessage, setServerMessage] = useState('');
    const [serverErrors, setServerErrors] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


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

  //implement pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = resources.slice(firstPostIndex, lastPostIndex);
 

    return(
        <>
   <NavigationBar/>



      {/* style this properly */}
  {serverMessage && <p className="server-message">{serverMessage}</p>}
  {serverErrors && <p className="server-error">{serverErrors}</p>}

  {/* unique key for items */}
  <div className='resource-header'>
  <h4>Resource List</h4>
  <hr/>
  </div>
  <div className='resources-results'>
    {/* even though usually resources.map since we are paginating only want to show the limit of posts */}
     {currentPosts.map((resource)=>(
        <ul className='resources-list'  key={resource.id}>
        <li>
        <img className="resources-image" alt="organization-image" src={ngo_stock}></img>
        <h2>{resource.org_name}</h2>
        <p>{resource.description}</p>
        <p>{resource.location}</p>
        <a href={resource.website} target="_blank" rel="noopener noreferrer">Website: {resource.website}</a>
        </li>
        
      </ul>

     ))}
     <Pagination
      totalPosts={resources.length}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>

  

  </div>

  {/* implement react-paginate for results. do the same for search results page */}

     <footer><Footer/></footer>


       </>

    );

} 