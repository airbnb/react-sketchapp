import React from 'react';
import renderer from 'react-test-renderer';
import RedBox from '../../src/components/RedBox';

describe('<RedBox />', () => {
  it('renders simple errors', () => {
    const mockedError = new Error('THIS IS AN ERROR');
    // override stack trace so that it's constant accross node versions
    mockedError.stack = `Error: awdawd
  at repl:1:13
  at Script.runInThisContext (vm.js:65:33)
  at REPLServer.defaultEval (repl.js:248:29)
  at bound (domain.js:375:14)
  at REPLServer.runBound [as eval] (domain.js:388:12)
  at REPLServer.onLine (repl.js:501:10)
  at REPLServer.emit (events.js:185:15)
  at REPLServer.emit (domain.js:421:20)
  at REPLServer.Interface._onLine (readline.js:285:10)
  at REPLServer.Interface._line (readline.js:638:8)`;
    const tree = renderer.create(<RedBox error={mockedError} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders string errors', () => {
    const tree = renderer.create(<RedBox error="String only error" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
