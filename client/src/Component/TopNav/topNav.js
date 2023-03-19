import React from "react";
import { Link } from "react-router-dom";

export const TopNav = () => {
    return (
        <div>
            <h1>header</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/customize">About Us</Link>
                </li>
            </ul>
        </div>
    )

}