/**
 * Created by yan on 16-2-18.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';

@connect(state=>state, actionCreators)
class App extends React.Component {
  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {
    return <div>Hello
      <button onClick={this.props.inc}>INC</button>
      <pre>{JSON.stringify(this.props, null, 2)}</pre>
    </div>
  }
}

export default App;