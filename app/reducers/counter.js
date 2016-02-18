/**
 * Created by yan on 16-2-18.
 */
import {INC} from '../constans';

export const counter = (state = 0, action)=> {
  switch (action.type) {
    case INC:
      return state + 1;
    default:
      return state;
  }
}

export default counter;