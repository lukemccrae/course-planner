import React from 'react';
import Start from '../../Start.js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });


const group = {
    name: 'group',
    timers: [{
      name: 'name',
      id: 1
    }]
  };

const timerFormat = jest.fn()

it('renders correctly', () => {
  const wrapper = shallow(<Start group={group} timeFormat={timerFormat} />);
  expect(wrapper).toMatchSnapshot();
});