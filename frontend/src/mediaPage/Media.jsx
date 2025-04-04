import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import "./Media.css";


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

    function iconMoveShows() {
        const icon = document.getElementById('arrow-icon-3');
        const dropdownMenu = document.getElementById('dropdown-items-3');

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
             {/* container for podcasts */}
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
                <li><a target="_blank" href="https://soundcloud.com/thebraveeducatorpodcast"> The Brave Educator Podcast</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://werehavinggaysex.com/"> We're having gay sex</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://chosenfamilypodcast.com/">Chosen Family Podcast</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/show/71Yij0hErmia1AR9EqT4Dg">OUTCincinnati</a></li>
                    {/* <li><a href="/podcasts">See More...</a></li> */}
                </ul>
                
                
            </ul>

            
            </div>
           
        </nav>

       </div>

        {/* container for movies */}
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
                <li><a target="_blank" rel="noopener noreferrer" href="https://www.imdb.com/title/tt19637052/"> Love Lies Bleeding</a></li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://www.netflix.com/title/81760197"> Will & Harper</a></li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://www.imdb.com/title/tt19356262/"> Drive-Away Dolls</a></li>
                </ul>
                
                
            </ul>
            </div>

        </nav>

       </div>

       <div className="media-container">
        <nav>
             {/* container for podcasts */}
            <div className="media-section">
                
            <ul className="dropdown">
                <div className="drop-section">
                <li>
                <svg onClick={iconMoveShows} id="arrow-icon-3" className="arrow" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                
                    <a> Shows</a>
                    </li>
                </div>
                  {/* Dropdown */}
                <ul id="dropdown-items-3" className="dropdown-items">
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.netflix.com/title/70242311">Orange is the New Black</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.disneyplus.com/series/glee/5h5XCwlaqNBK">Glee</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.netflix.com/title/81059939">Heartstopper</a></li>
                    {/* <li><a href="shows">See More...</a></li> */}
                </ul>
                
                
            </ul>

            
            </div>
           
        </nav>

       </div>
       <footer>
        <Footer/>
       </footer>

        </>

    );
}