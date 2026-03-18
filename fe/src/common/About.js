import React from "react";
import { useNavigate } from "react-router-dom"; // Recommended way to navigate in React
import './DashboardCSS.css';

function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="Dashboard-Container">
            {/* Navbar */}
            <div className="Navbar">
                <h2>Verity</h2>
            </div>
            
            <div className="Main-Content content-centered">
                <div className="About-Card">
                    <h1 className="About-Title">About Verity</h1>
                    
                    <div className="About-Section">
                        <h3>The Company</h3>
                        <p>
                            Verity is a leading provider of SOT (Source of Truth) based context management. 
                            We believe that AI is only as good as the data it accesses. Our mission is to 
                            provide a structured, verifiable environment for organizational knowledge.
                        </p>
                    </div>

                    <div className="About-Section">
                        <h3>Our Technology</h3>
                        <p>
                            Our platform uses advanced hierarchical indexing to ensure that when you 
                            "Ask anything," the AI assistant is drawing from the most accurate and 
                            up-to-date documents within your specific directory.
                        </p>
                    </div>

                    {/* Registration/Login Call to Action */}
                    <div className="CTA-Wrapper">
                        <div className="CTA-Box">
                            <span>Experience the future of document management.</span>
                            <button className="CTA-Button" onClick={() => navigate('/Register')}>
                                Register Now
                            </button>
                        </div>
                        
                        <div className="CTA-Box">
                            <span>Already have an account?</span>
                            <button className="CTA-Button secondary" onClick={() => navigate('/Login')}>
                                Login
                            </button>
                        </div>
                    </div>

                    {/* Footer / Contact Info */}
                    <div className="Contact-Footer">
                        <h4>Contact Us</h4>
                        <div className="Contact-Details">
                            <p><strong>Email:</strong> info@verity-sot.com</p>
                            <p><strong>HQ:</strong> Innovation Drive, Tech City, 560001</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;