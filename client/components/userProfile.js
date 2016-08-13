import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, fetchListsForUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';

/*.map((list, i) =>
           <List {...this.props} 
           info={this.props.info} 
           votes={list.upvote - list.downvote} 
           upLists={this.props.upLists} 
           downLists={this.props.downLists} 
           key={i} i={i} list={list} />)

*/
export class UserProfile extends Component {
  constructor(props){
    super(props);

  }
  componentWillMount(){
    this.props.fetchUserInfo();

   
  }

  fetchMyUpvotes(ids){
    this.props.fetchListsForUser(ids);
  }

  render(){
    const { upvote, downvote, list, info, upLists, downLists, upBoat } = this.props;
    console.log('userprofile', this.props);

    
    console.log('list', upBoat);

    if(!info) {
     
      return (<div><img height="100%" src="../loading_gangnam.gif" alt="loading" /></div> 

        );

    }
  
    return(
      <div>
        <NavBar />
        <img src={info.photo} alt="Profile Picture" />
        <h3>{info.username}</h3>
        <h3>{info.email}</h3>
        <div>
         <h1>LISTSSSS</h1>

          
          {this.fetchMyUpvotes(this.props.info.upvotedLists)}
        </div>


      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("ProfileState", state);
  return {
    list: state.lists.all,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    upBoat: state.upvoter

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserInfo, fetchListsForUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
