import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";
import { fetchInitialState } from '../redux/action-creators/fetch';

class Home extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchInitialState());
  }

  render() {
    return(
      <div className="home">
        <p>HOME</p>
        <p>HOME</p>
        <p>HOME</p>
        <Link to='/about'>HOME</Link>
      </div>
    );
  }
}



export default connect(state => state)(Home);
