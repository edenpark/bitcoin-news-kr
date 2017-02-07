import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';


class InitiallyHidden extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.hidden ? null : <div>...loads of content...</div>;
  }
  handleClickOutside() {
    this.props.hide();
  }
}

const A = onClickOutside(InitiallyHidden);

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideThing: true
    }
  }
  render() {
    return <div>
      <button onClick={e => this.showContent() }>click to show content</button>
      <A hidden={this.state.hideThing} hide={e => this.hideContent() }/>
    </div>;
  }
  showContent() {
    this.setState({ hideThing: false });
  }
  hideContent() {
    this.setState({ hideThing: true });
  }
}

export default UI;
