import './Footer.css'


export default function Footer(){

    const CurrentDate = new Date().getFullYear()
    return(
        <>
         <footer className="footer">
          
        <div className="footer-content">
            <div className="footer-section">
                <h3>About Us</h3>
                <p>Find LGBTQ+ Resources and Businesses in Cincinnati.
                <br/> 
                <br/>
                Help us grow our database by contributing and supporting our grassroots effort.</p>
            </div>
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/media">Media</a></li>
                    <li><a href="/resources">Resources</a></li>
                    <li><a href="/business">Businesses</a></li>
                    {/* <li><a href="/events">Events</a></li> */}
                </ul>
            </div>
            <div className="footer-section">
                <h3>Reach Us</h3>
                <ul>
                    {/* add a support us section */}
                    
                    <li><a href="https://www.buymeacoffee.com/cincygaypages" target='_blank'  rel="noopener noreferrer" >Buy Us A Coffee</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href='mailto:vennisabarfi@gmail.com'>Email Us</a></li>
                    
    
                </ul>
            </div>
            <div className="footer-section">
                <h3>Orgs to Reach</h3>
                <div className="helpful-orgs">
                    <ul>
                    <li> <a href="https://www.thetrevorproject.org/" target='_blank'  rel="noopener noreferrer">Trevor Project</a></li>
                    <li><a href="https://www.pflagcincinnati.org/" target='_blank'  rel="noopener noreferrer" >PFLAG Cincinnati</a></li>
                    <li> <a href="https://988lifeline.org/" target='_blank'  rel="noopener noreferrer" >National Suicide Prevention Lifeline</a></li>
                    <li><a href="mailto:chapter@gcoh.glsen.org" target='_blank'  rel="noopener noreferrer">GLSEN Greater Cincinnati</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; {CurrentDate} CincyConnect. All rights reserved.</p>
        </div>
    </footer>
        </>

    );
}