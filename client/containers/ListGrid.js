import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists, fetchUserInfo } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link } from 'react-router';
import NavBar from '../components/nav';
import {Panel} from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';

export class ListGrid extends Component {

  componentWillMount() {
    this.state = {term: "", activePage: 1};
    if(localStorage.getItem('logged')) {
      this.props.fetchUserInfo(JSON.parse(localStorage.getItem('userId')).userId);
    }
    this.props.fetchLists({type: 1});
  }

  onInputChange(term) {
    this.setState({term: term});
  }

  handleSelect(eventKey) {
    this.setState({activePage: eventKey});
    this.props.fetchLists({type: eventKey});
  }

  render() {
    console.log('content', this.props);
    return (
      <div>
        <NavBar />

        <div>

          <form>
              <input type="text" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
          </form>
        </div>
        <Panel />




        <ul className="list-group">
          {this.props.lists.filter(list => list.title.match(new RegExp("\\b".concat(this.state.term), "gi"))).map((list, i) => <List {...this.props} info={this.props.info} votes={list.upvote - list.downvote} upLists={this.props.upLists} downLists={this.props.downLists} key={i} i={i} list={list} />)}
        </ul>

         <Pagination
          className={this.props.lists.length === 0? 'hidden':'shown'}
          prev
          next
          first
          last
          ellipsis
          items={2}
          activePage={this.state.activePage}
          onSelect={this.handleSelect.bind(this)}
          >
        </Pagination>
      </div>
    )
  }
};

function mapStateToProps(state) {

  return {
    lists: state.lists.all,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    activePage: state.activePage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchUserInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGrid);
