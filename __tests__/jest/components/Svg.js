import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Svg, { G, Path } from '../../../src/components/Svg';

describe('<Svg />', () => {
  it('passes its children', () => {
    const tree = renderer
      .create(
        <Svg xmlns="http://www.w3.org/2000/svg" width="494" height="447" viewBox="0 0 494 447">
          <Svg.G fill="none" fillRule="evenodd">
            <Svg.Path fill="#FFAE00" d="M247 447L0 160 107 15 247 0l140 15 107 145" />
            <Svg.Path fill="#EC6C00" d="M247 447L0 160h494" />
            <Svg.Path fill="#FFAE00" d="M247 447L100 160h294" />
            <Svg.Path fill="#FFEFB4" d="M247 0L100 160h294" />
            <Svg.Path fill="#FFAE00" d="M107 15L52 88 0 160h101M387 15l55 73 52 72H393" />
            <Svg.Path fill="#FED305" d="M107 15l-7 145L247 0m140 15l7 145L247 0" />
          </Svg.G>
        </Svg>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('also works when child is directly imported', () => {
    const tree = renderer.create(
      <Svg xmlns="http://www.w3.org/2000/svg" width="494" height="447" viewBox="0 0 494 447">
        <G fill="none" fillRule="evenodd">
          <Path fill="#FFAE00" d="M247 447L0 160 107 15 247 0l140 15 107 145" />
          <Path fill="#EC6C00" className="pick-me" d="M247 447L0 160h494" />
          <Path fill="#FFAE00" d="M247 447L100 160h294" />
          <Path fill="#FFEFB4" d="M247 0L100 160h294" />
          <Path fill="#FFAE00" d="M107 15L52 88 0 160h101M387 15l55 73 52 72H393" />
          <Path fill="#FED305" d="M107 15l-7 145L247 0m140 15l7 145L247 0" />
        </G>
      </Svg>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.root.findByProps({ className: 'pick-me' }).type).toEqual(Path);
  });
});
