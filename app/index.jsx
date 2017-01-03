import React, { Component } from 'react';

import Header from './components/Header/Header.jsx';

if(typeof window === 'object') {
  require('./theme/_config.less');
}

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;