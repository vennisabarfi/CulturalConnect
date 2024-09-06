import './Footer.css'


export default function Footer(){
    return(
        <>
         <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>About Us</h3>
                <p>Find LGBTQ+ Resources and Businesses in Cincinnati. <br/> 
                Help us grow our database by contributing and supporting our grassroots effort.</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/contribute">Contribute</a></li>
                    <li><a href="/resources">Resources</a></li>
                    <li><a href="/events">Events</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Reach Us</h3>
                <ul>
                    {/* add a support us section */}
                    <li><a target="_blank" rel="noopener noreferrer" href='mailto:vennisabarfi@gmail.com'>Email Us</a></li>
                    <li><a href="+1234567890" target='_blank'  rel="noopener noreferrer" >Call Us</a></li>
    
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
        <div class="footer-bottom">
            <p>&copy; 2024 CincyConnect. All rights reserved.</p>
        </div>
    </footer>
        </>

    );
}