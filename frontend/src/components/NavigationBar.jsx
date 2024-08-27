
import './NavigationBar.css'


export default function NavigationBar(){
    return(
      <>
     <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>

    <nav className='nav-bar'>
      <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/events">Events</a></li>
      <li id="drop-down">
        <a href="/resources">Resources</a>
        {/* drop-down */}
        <ul id='drop-down-items'>
        <li><a href="#">Product 1</a></li>
        <li><a href="#">Product 2</a></li>
        <li><a href="#">Product 3</a></li>
        </ul>
        
        </li>

      <li><a href="/contribute">Contribute</a></li>
      <li><a href="/contribute">Contact Us</a></li>
      </ul>
    </nav>
 
  

      </>

    );
}