import React from "react";
import FileExplorer from "../components/FileExplorer.js";
import '../common/DashboardCSS.css';

function AdminDashboard() {
    function HandleModelClick() {
        console.log("Model button clicked - Opening AI Chat");
        // Logic to open AI Chat goes here
    }

    function HandleIngestClick() {
        console.log("Ingest button clicked - Opening Upload Panel");
        // Logic to trigger document ingestion goes here
    }

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
                    <h1>Welcome to Verity</h1>
                    <p>Your AI-powered document assistant. Hierarchical View.</p>
                    <div className="File-Explorer-Container">
                        <FileExplorer isAdmin={true} />
                    </div>
                </div>

                <div className="Right-Container">
                    {/* RESTORED BUTTONS */}
                    <div className="Model-Button" onClick={HandleModelClick}>
                        Ask me anything.
                    </div>
                    <div className="Ingest-Button" onClick={HandleIngestClick}>
                        Ingest Documents.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;