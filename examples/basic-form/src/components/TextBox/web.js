import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';

class TextBox extends Component {

  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      passwordStrength: false
    }
  }


  handleKeyDown() {
    // const element = React
  }

  render() {
    return (
      <div style={{...styles.formElement}}>
        <label style={{...styles.label}}>{this.props.label}</label>
        <input
          style={{...styles.textbox, lineHeight: '100%'}}
          type={this.props.type}
        />
      </div>
    )
  }
}

TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default TextBox;