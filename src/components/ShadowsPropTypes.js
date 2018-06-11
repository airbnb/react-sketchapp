import PropTypes from 'prop-types';

module.exports = {
  shadowColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shadowInner: PropTypes.bool,
  shadowOffset: { width: PropTypes.number, height: PropTypes.number },
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowSpread: PropTypes.number,
};
