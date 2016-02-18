/**
 * Created by yan on 16-2-18.
 */

export const fetchMembers = (orgName)=> {
  return fetch(`https://api.github.com/orgs/${orgName}/members`).then(res=>res.json())
}
