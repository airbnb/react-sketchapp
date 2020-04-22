import * as PropTypes from 'prop-types';

export const ShadowsPropTypes = {
  shadowColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shadowOffset: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowSpread: PropTypes.number,
  shadowInner: PropTypes.bool,
};
