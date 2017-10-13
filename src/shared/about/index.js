import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class About extends Component {

  render() {
    return(
      <div className="about">
        <p>ABOUT</p>
        <p>ABOUT</p>
        <p>ABOUT</p>
        <Link to='/'>Go Home</Link>
      </div>
    );
  }
}

export default About;
