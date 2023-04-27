import React from "react";
import ReactLoading from "react-loading";
import '../styles/home.css'


export default function Loading() {
    return (
        <div className="loader">
            <ReactLoading
                type="spinningBubbles"
                color="#ccc145"
                height={150}
                width={150}
            />
        </div>
    );
}