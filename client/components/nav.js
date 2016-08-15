import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import OurModal from '../containers/modal';
import SignOut from './signoutButton';
import SignUp from './signup';


export default class navBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
  const author = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : null;
    return(
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/"  className="navbar-brand">
                <img height="100%" src="../logo.png" alt="WanderList-logo" />
              </Link>
            </div>

            <ul className="nav navbar-nav navBtns">
              <li className="active"><a href="#">Main<span className="sr-only">(current)</span></a></li>
              <li><a href="#">Favorites</a></li>
              <li><a href="#">My Lists</a></li>
              <li><a href="#">My Drafts</a></li>
            </ul>


            <div className="nav navbar-nav navbar-right mainBtns">
              <li>
              <Link to="/lists/new">
                Add a list
              </Link>
              </li>
              <li>{(Object.keys(window.localStorage)).length ? <SignOut />  : <OurModal />}</li>
              <li>{(Object.keys(window.localStorage)).length ? null : <SignUp /> }</li>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginState: state
  };
}


export default connect(mapStateToProps, null)(navBar);
