/**
 * Created by yan on 16-2-18.
 */
import * as API from '../api'
import {INC,RECEIVE_MEMBERS} from '../constans';

export const inc = ()=> ({
  type: INC
});

const fetchMembers = payload=> {
  return (dispatch)=> {
    API.fetchMembers('oneapm')
      .then(res=> {
        dispatch({
          type: RECEIVE_MEMBERS,
          payload: res
        })
      })
  }
}

export {fetchMembers}