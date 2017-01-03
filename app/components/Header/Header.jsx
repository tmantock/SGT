import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
  renderLinks(){
     if (this.props.authenticated) {
          return [
              <li className="nav-item" key={1}>
                  <Link className="nav-link" to="/grades">Grades</Link>
              </li>,
              <li className="nav-item" key={2}>
                  <Link className="nav-link" to="/signout">Sign-Out</Link>
              </li>
          ];
      } else {
          return [
                  <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin">Sign-In</Link>
                  </li>,
                  <li className="nav-item" key={2}>
                      <Link className="nav-link" to="/signup">Sign-Up</Link>
                  </li>
          ];
      }
  }

  render(){

    return (
     
          <nav className = "navbar navbar-light">
            <Link to="/" className="navbar-brand">Student Table</Link>
                <ul className = "nav navbar-nav">
  
                </ul>
            </nav>
    );
  }
}


export default Header;