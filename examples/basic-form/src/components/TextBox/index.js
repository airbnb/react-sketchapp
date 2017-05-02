/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import StrengthMeter from '../StrengthMeter';

class TextBox extends Component {

  props: {
    label: string,
    type: string,
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div style={styles.formElement}>
        <label style={styles.label}>{this.props.label}</label>
        <input
          style={{...styles.textbox, lineHeight: '100%'}}
          type={this.props.type}
          value={this.state.value}
          onChange={this.handleChange}
        />
          {this.props.children &&
            React.cloneElement(this.props.children, {password: this.state.value})
          }
      </div>
    )
  }
}

export default TextBox;