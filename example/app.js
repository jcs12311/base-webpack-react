import './styles.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return <div>
      Hello React!
    </div>
  }
}

ReactDOM.render(<App />,
  document.querySelector('#app'));