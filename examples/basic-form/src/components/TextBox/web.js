import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import StrengthMeter from '../StrengthMeter';

class TextBox extends Component {

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
      <div style={{...styles.formElement}}>
        <label style={{...styles.label}}>{this.props.label}</label>
        <input
          style={{...styles.textbox, lineHeight: '100%'}}
          type={this.props.type}
          value={this.state.value}
          onChange={this.handleChange}
        />
        { this.props.type === 'password' && this.state.value.length > 0 &&
          <StrengthMeter
            password={this.state.value}
          />
        }
      </div>
    )
  }
}

TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default TextBox;