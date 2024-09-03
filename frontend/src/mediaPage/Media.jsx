import NavigationBar from "../components/NavigationBar";
import "./Media.css"
export default function Media(){


    function checkboxColor(){
        const checkbox = document.querySelector('.checkbox-input');
        const checkContainer = document.querySelector('.check-container');

        // add error handling
        checkbox.addEventListener("change", function(){
            if (checkbox.checked) {
                checkContainer.style.backgroundColor = "#e24e67";
            } else {
                checkContainer.style.backgroundColor = 'pink';
            }
        })
    }
    return(

        <>
        <NavigationBar/>
        <div className="media-checkbox"></div>
        <div className="check-container" id="change-color" onClick={checkboxColor}>

        <input type="checkbox" className="checkbox-input" name="cb" id="cb"/>
        <label className="checkbox-label" htmlFor="cb">Podcasts</label>

        </div>
        </>

    );
}