import React from "react";
import FileExplorer from "../components/FileExplorer.js";
import './admin.css';

function HandleModelClick() {
    console.log("Model button clicked");
}

function HandleIngestClick() {
    console.log("Ingest button clicked");
}

function AdminDashboard() {
    return (
        <div className="Dashboard-Container">
            <div className="Navbar">
                <h2>Verity</h2>
                <button className="Profile">
                    <img src="" />
                </button>
            </div>
            <div className="Main-Content">
                <div className="Left-Container">
                    <h1>Welcome to Verity</h1>
                    <p>Your AI-powered document assistant.
                        Hierarchical View.
                    </p>
                    <div className="File-Explorer-Container">
                        <FileExplorer />
                    </div>
                </div>
                <div className="Right-Container">
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