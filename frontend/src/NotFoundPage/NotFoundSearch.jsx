import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import './NotFound.css'

export default function NotFoundSearch(){
    return(
        <>
        <NavigationBar/>
        <div className="not-found-header">
        
        <h1>Hmm...</h1>
        <h2 >No results found!</h2>
        <a href="/"> Go back</a>
        </div>
      

        <></>

        <footer>
            <Footer/>
        </footer>
        </>

    );
}