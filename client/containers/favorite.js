import React, { Component } from 'react';

export default class Favorite extends Component {

  constructor(props) {
    super(props);
    this.toggleFavFunc = this.toggleFavFunc.bind(this);
  }

  toggleFavFunc(favStatus) {
    if(firebase.auth().currentUser) {
      console.log('FAV!!!', favStatus);
      this.props.favoriteAction(this.props.list._id, firebase.auth().currentUser.uid, favStatus);
    } else {
      alert("You must be signed in to favorite lists!");
    }
  }

  render() {
    const { list, info } = this.props;

    const favStatus = this.props.favoriteLists.includes(list._id.toString());


    return (
      <div className="col-md-1">
        <div className="text-center fa fa-star" style={{color: favStatus ? "gold" : "grey"}} onClick={this.toggleFavFunc.bind(this, favStatus)} />
      </div>
    );
  }
}
