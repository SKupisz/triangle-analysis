import React from "react";
import {Link} from "react-router-dom";

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <nav className="main-navbar">
                <Link to = "/">
                    <div className="nav-elem">Kalkulator</div>
                </Link>
                <Link to = "/about">
                    <div className="nav-elem">O projekcie</div>
                </Link>
            </nav>
        );
    }
}