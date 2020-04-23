import * as React from 'react';
import * as PropTypes from 'prop-types';
import ErrorStackParser from 'error-stack-parser';
import { Text } from './Text';
import { View } from './View';

type StackFrame = {
  isConstrutor?: boolean;
  isEval?: boolean;
  isNative?: boolean;
  isTopLevel?: boolean;
  columnNumber?: number;
  lineNumber?: number;
  fileName?: string;
  functionName?: string;
  source?: string;
  args?: any[];
  evalOrigin?: StackFrame;
};

const styles = {
  redbox: {
    padding: 10,
    width: 480,
    backgroundColor: 'rgb(204, 0, 0)',
  },
  frame: {},
  message: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: 'white',
  },
  stack: {
    fontFamily: 'Monaco',
    marginTop: 20,
    color: 'white',
  },
};

export const ErrorBoxPropTypes = {
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.string]).isRequired,
  // filename: PropTypes.string,
  // editorScheme: PropTypes.string,
  // useLines: PropTypes.bool,
  // useColumns: PropTypes.bool,
};

type Props = PropTypes.InferProps<typeof ErrorBoxPropTypes>;

export class RedBox extends React.Component<Props> {
  static propTypes = ErrorBoxPropTypes;

  static defaultProps = {
    useLines: true,
    useColumns: true,
  };

  renderFrames(frames: Array<StackFrame>) {
    return frames.map((f, index) => (
      <Text key={index} style={styles.stack}>
        {f.functionName}
      </Text>
    ));
  }

  render() {
    const { error } = this.props;

    if (typeof error === 'string') {
      return (
        <View name="RedBox" style={styles.redbox}>
          <Text name="Message" style={styles.message}>{`Error: ${error}`}</Text>
        </View>
      );
    }

    let frames: ErrorStackParser.StackFrame[] | undefined;
    let parseError: Error | undefined;

    let frameChildren: JSX.Element[] | JSX.Element | undefined;

    try {
      frames = ErrorStackParser.parse(error);
    } catch (e) {
      parseError = new Error('Failed to parse stack trace. Stack trace information unavailable.');
    }

    if (parseError) {
      frameChildren = (
        <View style={styles.frame} key={0}>
          <View>{parseError.message}</View>
        </View>
      );
    }

    if (frames) {
      frameChildren = this.renderFrames(frames);
    }

    return (
      <View name="RedBox" style={styles.redbox}>
        <Text name="Message" style={styles.message}>
          {`${error.name}: ${error.message}`}
        </Text>
        <View name="Frames" style={styles.stack}>
          {frameChildren}
        </View>
      </View>
    );
  }
}
