import 'beercss'
import './Events.css'

export default function Events(){
    return(
        <>
           <div className="tabs">
  <a href="/">
    <i>home</i>
    <span>Home</span>
  </a>
  <a className='active' onClick={(e) => e.preventDefault()} href="/events">
    <i></i>
    <span>Events</span>
  </a>
  <a className="dropdown" href="/resources">
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

    
        
        </>
    );
}