import * as PropTypes from 'prop-types';

export default {
  shadowColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shadowOffset: { width: PropTypes.number, height: PropTypes.number },
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowSpread: PropTypes.number,
  shadowInner: PropTypes.bool,
};
