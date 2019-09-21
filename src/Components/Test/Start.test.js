import React from 'react';
import Start from '../Start';
import renderer from 'react-test-renderer';


test('Group of timers is activated when Start is clicked.', () => {
  let group = {
    timers: [{
      id: 1,
      name: 'group'
    }],
  }
  let timeFormat = function() {};

  const component = renderer.create(
    <Start
      timeFormat={timeFormat}
      group={group}>
    </Start>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
