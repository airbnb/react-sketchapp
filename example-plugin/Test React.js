import React from 'react';
import { render } from '../src';

const colors = {
  gray: '#F3F4F4',
  sur: '#96DBE4',
  peach: '#EFADA0',
  pear: '#93DAAB',
};

const document = (
  <group>
    <group name="✌️ My group">
      <oval
        name="👏 Creative Cloud"
        x={20}
        y={20}
        width={100}
        height={100}
        backgroundColor={colors.sur}
      />
      <rect
        name="👏 Shout it out loud"
        x={140}
        y={20}
        width={150}
        height={100}
        radius={100}
        backgroundColor={colors.peach}
      />
      <rect
        name="👏 Gather the crowd"
        x={70}
        y={140}
        width={100}
        height={100}
        radius={2}
        backgroundColor={colors.pear}
      />
    </group>

    <group name="✌️ Text tho" x={300}>
      <text
        name="👏 Gather the crowd"
        value="Gather the crowd"
        x={20}
        y={20}
        makeTextStyle
        color={colors.peach}
        fontFamily="GTAmericaTrial-Bold"
        fontSize={24}
        lineHeight={36}
      />

      <text
        name="👏 Shout it aloud"
        value="Shout it aloud"
        x={20}
        y={60}
        makeTextStyle
        color={colors.peach}
        fontFamily="GTAmericaTrialExpanded-Bold"
        fontSize={24}
        lineHeight={36}
      />

      <text
        value="Creative Cloud"
        makeTextStyle={false}
        x={20}
        y={100}
        color={colors.peach}
        fontFamily="GTAmericaTrialCondensed-Bold"
        fontSize={24}
        lineHeight={36}
      />
    </group>
  </group>
);

const onRun = (context) => {
  render(document, context);
};

module.exports = onRun;
