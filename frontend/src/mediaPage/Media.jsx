import NavigationBar from "../components/NavigationBar";
import "./Media.css"
export default function Media(){

    // icon movement
    function iconMovePodcast() {
        const icon = document.getElementById('arrow-icon-1');
        const dropdownMenu = document.getElementById('dropdown-items-1');

        if (icon.style.transform === 'rotate(90deg)'){
                icon.style.transform = 'rotate(0deg)'; //rotate to 0 degrees
                dropdownMenu.style.display = 'none'; // hide dropdown menu
        }else{
            icon.style.transform = 'rotate(90deg)'; //rotate to 0 degrees
            dropdownMenu.style.display = 'block'; // hide dropdown menu
        }
        
    }

    function iconMoveMovie() {
        const icon = document.getElementById('arrow-icon-2');
        const dropdownMenu = document.getElementById('dropdown-items-2');

        if (icon.style.transform === 'rotate(90deg)'){
                icon.style.transform = 'rotate(0deg)'; //rotate to 0 degrees
                dropdownMenu.style.display = 'none'; // hide dropdown menu
        }else{
            icon.style.transform = 'rotate(90deg)'; //rotate to 0 degrees
            dropdownMenu.style.display = 'block'; // hide dropdown menu
        }
        
    }

   
    return(

        <>
        <NavigationBar/>
        <div className="media-header">
            <h4 >Media</h4>
            <hr/>
        </div>
       
       <div className="media-container">
        <nav>
            <div className="media-section">
                
            <ul className="dropdown">
                <div className="drop-section">
                <li>
                <svg onClick={iconMovePodcast} id="arrow-icon-1" className="arrow" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                
                    <a> Podcasts</a>
                    </li>
                </div>
                  {/* Dropdown */}
                <ul id="dropdown-items-1" className="dropdown-items">
                    <li><a>map a</a></li>
                </ul>
                
                
            </ul>

            
            </div>
           
        </nav>

       </div>


       <div className="media-container">
        <nav>
            <div className="media-section">
                
            <ul className="dropdown">
                <div className="drop-section">
                <li>
                <svg onClick={iconMoveMovie} id="arrow-icon-2" className="arrow" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                
                    <a> Movies</a>
                    </li>
                </div>
                  {/* Dropdown */}
                <ul id="dropdown-items-2" className="dropdown-items">
                    <li><a>map a</a></li>
                </ul>
                
                
            </ul>

            
            </div>
           
        </nav>

       </div>
        </>

    );
}