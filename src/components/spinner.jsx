import React from "react";
import "../css/spinner.css";

export default function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
            <p>It's almost done ...</p>
        </div>
    );
}