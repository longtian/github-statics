/**
 * Created by yan on 16-2-18.
 */
import {RECEIVE_MEMBERS} from '../constans';

export const github = (state = {}, action)=> {
  switch (action.type) {
    case RECEIVE_MEMBERS:
      return Object.assign({}, state, {
        members: action.payload
      });
    default:
      return state;
  }
}


export default github;