const { drawGroup, drawText, drawOval, drawRectangle, initialize } = require('../src/shared');

const colors = {
  gray: '#F3F4F4',
  sur: '#96DBE4',
  peach: '#EFADA0',
  pear: '#93DAAB',
};

function onRun(context) {
  const { page } = initialize(context);

  const textLayer1 = drawText({
    name: '👏 Gather the crowd',
    value: '👏 Gather the crowddddddd',
    x: 20,
    y: 20,
    color: colors.peach,
    fontFamily: 'GTAmericaTrial-Bold',
    fontSize: 24,
    lineHeight: 36,
  });

  const textLayer2 = drawText({
    name: '👏 Shout it aloud',
    value: '👏 Shout it aloud',
    x: 20,
    y: 60,
    color: colors.peach,
    fontFamily: 'GTAmericaTrialExpanded-Bold',
    fontSize: 24,
    lineHeight: 36,
  });

  const textLayer3 = drawText({
    value: '👏 Creative Cloud',
    x: 20,
    y: 100,
    color: colors.peach,
    fontFamily: 'GTAmericaTrialCondensed-Bold',
    fontSize: 24,
    lineHeight: 36,
  });


  const layer1 = drawOval({
    name: '👏 Creative Cloud',
    x: 20,
    y: 20,
    width: 100,
    height: 100,
    backgroundColor: colors.sur,
  });

  const layer2 = drawRectangle({
    name: '👏 Shout it aloud',
    x: 140,
    y: 20,
    width: 150,
    height: 100,
    radius: 100,
    backgroundColor: colors.peach,
  });

  const layer3 = drawRectangle({
    name: '👏 Gather the crowd',
    x: 70,
    y: 140,
    width: 100,
    height: 100,
    radius: 2,
    backgroundColor: colors.pear,
  });

  // => MSRectangle

  page.addLayers([
    drawGroup({
      children: [layer1, layer2],
    })
  ])

  const shapeGroup = drawGroup({
    children: [layer1, layer2, layer3],
    name: '✌️ My Group',
  });

  const textGroup = drawGroup({
    children: [textLayer1, textLayer2, textLayer3],
    x: 300,
    name: 'Text Group',
  });

  page.addLayers([
    drawGroup({
      children: [
        shapeGroup,
        textGroup,
      ],
    }),
  ]);

  // group.setIsSelected(true);
}

module.exports = onRun;
