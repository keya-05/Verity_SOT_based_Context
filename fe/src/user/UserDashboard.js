import React from "react";
import FileExplorer from "../components/FileExplorer.js";
import '../common/DashboardCSS.css';

function UserDashboard() {
    return (
        <div className="Dashboard-Container">
            <div className="Navbar">
                <h2>Verity</h2>
                <button className="Profile">
                    <img src="" alt="P" />
                </button>
            </div>
            
            <div className="Main-Content">
                <div className="Left-Container">
                    <h1>Your Knowledge Base</h1>
                    <p>Select a document from your hierarchy to gain insights.</p>
                    <div className="File-Explorer-Container">
                        <FileExplorer isAdmin={false} />
                    </div>
                </div>

                <div className="Right-Container">
                    <div className="Model-Button" onClick={() => console.log("AI Chat")}>
                        Ask me anything.
                    </div>
                    {/* Ingest button is hidden for Users */}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;