import React from "react";
import ReactLoading from "react-loading";
import '../styles/home.css'
import '../styles/loader.css'



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
        // <>
        //     <h1>Loading...</h1>
        //     <div class="drop-container">
        //         <div class="drop"></div>
        //     </div>
        // </>
    );
}