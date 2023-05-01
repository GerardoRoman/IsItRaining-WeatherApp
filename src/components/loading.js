import React from "react";
import ReactLoading from "react-loading";
import '../styles/home.css'
import '../styles/loader.css'


export default function Loading() {
    return (
        <>
            <div className="hideImgIcon"></div>
            <div className="loader">
                <ReactLoading
                    type="spinningBubbles"
                    color="#BF00FF"
                    height={150}
                    width={150} />
            </div>

            <div className="hideNavBar"></div>
        </>
    );
}