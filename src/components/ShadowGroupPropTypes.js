import PropTypes from 'prop-types';

module.exports = {
  shadowColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shadowOffset: { width: PropTypes.number, height: PropTypes.number },
  shadowSpread: PropTypes.number,
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
};
