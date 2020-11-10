import React, { Component } from 'react'
import "./menu.css"
import {Link } from 'react-router-dom';


export default class Menu extends Component {
    public render() {
        return (
            <div className="menu">
              <h1>MENU</h1> 
                 <Link to = "/">home</Link>
                 <Link to = "/register">sign up</Link>
              
            </div>
        );
    }
}