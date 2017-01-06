import React, { PropTypes } from 'react';
import ViewStylePropTypes from './ViewStylePropTypes';

class StyleProvider extends React.Component {
  render() {
    return (
      <sharedStyles
        clearExistingStyles={this.props.clearExistingStyles}
        styles={this.props.styles}
      >
        {this.props.children}
      </sharedStyles>
    );
  }
}

StyleProvider.propTypes = {
  children: PropTypes.element,
  clearExistingStyles: PropTypes.bool,
  styles: PropTypes.shape({
    ...ViewStylePropTypes,
  }).isRequired,
};

export default StyleProvider;
