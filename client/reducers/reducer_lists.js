import { USER_INFO,FETCH_LISTS, FETCH_LIST, UPVOTE, DOWNVOTE, ADD_COMMENT, REMOVE_COMMENT, CREATE_LIST } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  list: null,
  createdList: null,
  info: null,
  upvotedLists: [],
  downvotedLists: []
};

export default function(state = INITIAL_STATE, action) {
  if(action.type === FETCH_LIST) {
    return { ...state, list: action.payload.data };
  } else if(action.type === CREATE_LIST) {
    console.log('createdList', action.payload.data);
    return { ...state, createdList: action.payload.data};
  } else if(action.type === USER_INFO) {
    console.log("USERINFO", action.payload.data)
    return { ...state, info: action.payload.data, upvotedLists: action.payload.data.upvotedLists, downvotedLists: action.payload.data.downvotedLists };
  } else if(action.type === FETCH_LISTS) {
    console.log("FETCHLISTS", action.payload);
    return {
      ...state, all: action.payload.data
    };
  } else if(action.type === UPVOTE) {
    //const { up, down } = action.payload.data;
    let index = 0;
    let upIndex = state.upvotedLists.indexOf(action.id);
    let downIndex = state.downvotedLists.indexOf(action.id);
    state.all.forEach((list, i) => {
      if (list._id.toString() === action.id) {
        index = i;
      }
    });
    let targetList = state.all[index];
    console.log("reducer_lists", targetList)
    //targetList.upvote = +targetList.upvote + (+up);
    //targetList.downvote = +targetList.downvote + (+down);
    if (upIndex === -1) {
      if (downIndex === -1) {
        targetList.upvote += 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.upvote),
            ...state.all.slice(index + 1)
          ],
          upvotedLists: [
            ...state.upvotedLists,
            action.id
          ],
          list: targetList
        };
      } else {
        targetList.upvote += 1;
        targetList.downvote -= 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.upvote, targetList.downvote),
            ...state.all.slice(index + 1)
          ],
          upvotedLists: [
            ...state.upvotedLists,
            action.id
          ],
          downvotedLists: [
            ...state.downvotedLists.slice(0, downIndex),
            ...state.downvotedLists.slice(downIndex + 1)
          ],
          list: targetList
        };
      }
    } else {
      targetList.upvote -= 1;
      return {
        ...state,
        all:[
          ...state.all.slice(0, index),
          Object.assign({}, targetList, targetList.upvote),
          ...state.all.slice(index + 1)
        ],
        upvotedLists: [
          ...state.upvotedLists.slice(0, upIndex),
          ...state.upvotedLists.slice(upIndex + 1)
        ],
        list: targetList
      };
    }
  } else if(action.type === DOWNVOTE) {
    //const { up, down } = action.payload.data;
    let index = 0;
    let upIndex = state.upvotedLists.indexOf(action.id);
    let downIndex = state.downvotedLists.indexOf(action.id);
    state.all.forEach((list, i) => {
      if (list._id.toString() === action.id) {
        index = i;
      }
    });
    let targetList = state.all[index];
    //targetList.upvote = +targetList.upvote + (+up);
    //targetList.downvote = +targetList.downvote + (+down);
    if (downIndex === -1) {
      if (upIndex === -1) {
        targetList.downvote += 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.downvote),
            ...state.all.slice(index + 1)
          ],
          downvotedLists: [
            ...state.downvotedLists,
            action.id
          ],
          list: targetList
        };
      } else {
        targetList.downvote += 1;
        targetList.upvote -= 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.upvote, targetList.downvote),
            ...state.all.slice(index + 1)
          ],
          downvotedLists: [
            ...state.downvotedLists,
            action.id
          ],
          upvotedLists: [
            ...state.upvotedLists.slice(0, upIndex),
            ...state.upvotedLists.slice(upIndex + 1)
          ],
          list: targetList
        };
      }
    } else {
      targetList.downvote -= 1;
      return {
        ...state,
        all:[
          ...state.all.slice(0, index),
          Object.assign({}, targetList, targetList.downvote),
          ...state.all.slice(index + 1)
        ],
        downvotedLists: [
          ...state.downvotedLists.slice(0, downIndex),
          ...state.downvotedLists.slice(downIndex + 1)
        ],
        list: targetList
      };
    }
  } else if(action.type === ADD_COMMENT) {
    return {
      ...state,
        list:{
          ...state.list,
          comments: [
            ...state.list.comments,
            JSON.parse(action.payload.config.data)
          ]
        }
    }

  } else if(action.type === REMOVE_COMMENT) {
      return {
        ...state,
        list: {
          ...state.list,
          comments: [
            ...state.list.comments.slice(0, action.commentIndex),
            ...state.list.comments.slice(action.commentIndex + 1)
          ]
        }
      }
  } else {
    return state;
  }
}
