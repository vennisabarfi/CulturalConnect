
import './Events.css'
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { InstagramEmbed } from 'react-social-media-embed';

export default function Events(){
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



 

  <footer>
    <Footer/>
  </footer>




    
        </>
    );
}