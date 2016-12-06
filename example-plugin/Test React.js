import React from 'react';
import { render } from '../src';
import { dump } from '../src/debug';
import Text from './components/Text';
import View from './components/View';

global.dump = dump;

const colors = {
  gray: '#F3F4F4',
  sur: '#96DBE4',
  peach: '#EFADA0',
  pear: '#93DAAB',
};

const text = (
  <artboard>
    <View style={{ backgroundColor: colors.gray, padding: 20 }}>
      <View
        style={{
          width: 200,
        }}
      >
        <Text
          style={{
            fontFamily: 'Arial',
            fontSize: 24,
            lineHeight: 32,
            color: '#000',
          }}
        >
          Hello World! this is a bunch of text that I am hoping wraps...
        </Text>
      </View>
    </View>
  </artboard>
);

// const element = (
//   <View style={{ backgroundColor: colors.gray, padding: 20 }}>
//     <View
//       style={{
//         flexDirection: 'column',
//         backgroundColor: colors.sur,
//         padding: 20,
//         margin: 20,
//       }}
//     >
//       <View
//         style={{
//           width: 100,
//           height: 100,
//           backgroundColor: colors.pear,
//           borderRadius: 10,
//           opacity: 0.5,
//         }}
//       />
//       <View
//         style={{
//           width: 100,
//           height: 100,
//           backgroundColor: colors.pear,
//           margin: 10,
//           borderWidth: 1,
//           borderRadius: 10,
//           borderColor: '#000',
//         }}
//       />
//       <View style={{ width: 200, height: 100, backgroundColor: colors.pear }} />
//     </View>
//   </View>
// );

const onRun = (context) => {
  log('onRun');
  // render(element, context);
  render(text, context);
};

module.exports = onRun;
