// @flow
import React, { Component } from 'react';
import styles from './style';

class TextBox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: this.props.value,
    };
  }

  props: {
    label: string,
    type: string,
    value: string,
    children?: React$Element<any>,
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div style={styles.formElement}>
        <label style={styles.label} htmlFor={this.props.type}>
          {this.props.label}
        </label>
        <input
          id={this.props.type}
          style={{ ...styles.textbox, lineHeight: '100%' }}
          type={this.props.type}
          value={this.state.value}
          onChange={this.handleChange}
        />
        {this.props.children &&
          React.cloneElement(this.props.children, { password: this.state.value })}
      </div>
    );
  }
}

export default TextBox;
