import NavigationBar from "../components/NavigationBar";
import "./Media.css"
export default function Media(){


    function checkboxColor() {
        var checkboxes = document.querySelectorAll('.checkbox-input');
    
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener("change", function() {
                if (checkbox.checked) {
                    // Uncheck all other checkboxes
                    checkboxes.forEach(function(otherCheckbox) {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                            // Update the background color of other containers
                            const otherContainer = otherCheckbox.closest('.check-container');
                            if (otherContainer) {
                                otherContainer.style.backgroundColor = 'pink';
                            }
                        }
                    });
    
                    // Update the background color of the current container
                    const currentContainer = checkbox.closest('.check-container');
                    if (currentContainer) {
                        currentContainer.style.backgroundColor = "#e24e67"; // Color when checked
                    }
                } else {
                    // If the checkbox is unchecked, set its container to default color
                    const currentContainer = checkbox.closest('.check-container');
                    if (currentContainer) {
                        currentContainer.style.backgroundColor = 'pink'; // Default color
                    }
                }
            });
        });
    }
    
    // Call the function to initialize event listeners
    checkboxColor();
    return(

        <>
        <NavigationBar/>
        <div className="media-header">
            <h4 >Media</h4>
            <hr/>
        </div>
        <div className="media-checkbox">

            {/* PODCAST */}
        <div className="check-container" id="change-color" onClick={checkboxColor}>
        <input type="checkbox" className="checkbox-input" name="cb1" id="cb1"/>
        <label className="checkbox-label" htmlFor="cb1">Podcasts</label>
        </div>

        {/* MUSIC */}
        <div className="check-container" id="change-color" onClick={checkboxColor}>
        <input type="checkbox" className="checkbox-input" name="cb2" id="cb2"/>
        <label className="checkbox-label" htmlFor="cb2">Music</label>
        </div>  

        {/* Social Media Content */}
        <div className="check-container" id="change-color" onClick={checkboxColor}>
        <input type="checkbox" className="checkbox-input" name="cb3" id="cb3"/>
        <label className="checkbox-label" htmlFor="cb3">Social</label>
        </div> 

        {/* Movies */}
        <div className="check-container" id="change-color" onClick={checkboxColor}>
        <input type="checkbox" className="checkbox-input" name="cb4" id="cb4"/>
        <label className="checkbox-label" htmlFor="cb4">Movies</label>
        </div> 

        {/* Shows */}
     
        <div className="check-container" id="change-color" onClick={checkboxColor}>
        <input type="checkbox" className="checkbox-input" name="cb5" id="cb5"/>
        <label className="checkbox-label" htmlFor="cb5">Shows</label>
        </div> 

        {/* People */}
        <div className="check-container" id="change-color" onClick={checkboxColor}>
        <input type="checkbox" className="checkbox-input" name="cb6" id="cb6"/>
        <label className="checkbox-label" htmlFor="cb6">People</label>
        </div> 

        </div>
        </>

    );
}