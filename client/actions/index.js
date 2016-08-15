import axios from 'axios';

export const USER_INFO = 'USER_INFO';
export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LIST = 'FETCH_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const AUTH_IN = 'AUTH_IN';
export const SIGN_UP = 'SIGN_UP';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function fetchUserInfo(uid) {
  const request = axios.get(`/api/user/${uid}`);
  return {
    type: USER_INFO,
    payload: request
  };
}

export function fetchLists(props) {
  console.log("fetcherprops", props);

  const request = axios.get(`/api/lists`, props);
  return {
    type: FETCH_LISTS,
    payload: request
  };
}

export function fetchLists(props) {
  console.log("fetcherprops", props);
  const request = axios.post(`/api/lists1`, props);
  return {
    type: FETCH_LISTS,
    payload: request
  };
}

export function fetchList(id) {
  const request = axios.get(`/api/lists/${id}`);
  return {
    type: FETCH_LIST,
    payload: request
  };
}

export function createList(props) {
  props.author = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : "idk  ¯\_(ツ)_/¯";

  const request = axios.post(`/api/lists`, props);
  return {
    type: CREATE_LIST,
    payload: request
  };
}

export function deleteList(id) {
  const request = axios.delete(`/api/lists/${id}`);
  return {
    type: DELETE_LIST,
    payload: request
  };
}

export function userAuth(props) {
  console.log("AUTH IN HAS BEEN HIT", props);
  const request = axios.post(`/api/auth`, props);
  return {
    type: AUTH_IN,
    payload: request
  };
}

// export function userCreate(props) {
//   const request = axios.post('/api/auth', props);
//   return {
//     type: SIGN_UP,
//     payload: request
//   };
// }

export function upvote(lid, uid) {
  const data = {
    lid: lid,
    votes: true,
    uid: uid
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: UPVOTE,
    id: lid
  };
}

export function downvote(lid, uid) {
  const data = {
    lid: lid,
    votes: false,
    uid: uid
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: DOWNVOTE,
    id: lid
  };
}

export function addComment(postId, userId, author, comment) {

  const data = {
    _id: postId,
    userId: userId,
    user: author,
    text: comment
  };
  //DELETE ME AFTER WORKING
  console.log(data);

  const request = axios.post(`/api/comments`, data);
  return {
    type: ADD_COMMENT,
    payload: request
  }
}

//remove comment, need to get this to work
export function removeComment(listId, commentIndex) {
  const data = {
    commentIndex
  }
  const request = axios.post(`/api/comments/${listId}`, data)

  console.log("removing a comment!");

  return {
    type: REMOVE_COMMENT,
    listId,
    commentIndex,
    payload: request
  }
}
