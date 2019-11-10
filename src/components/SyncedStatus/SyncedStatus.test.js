import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SyncedStatus from './SyncedStatus-view';
import { Spinner } from 'react-bootstrap';
import Icon from 'react-icons-kit';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(<SyncedStatus />);

  return { wrapper };
}

describe('LastModified component', () => {
  it('should render a loader if not synced', () => {
    const { wrapper } = setup();
    wrapper.setProps({ synced: false });
    expect(wrapper.exists(Spinner)).toEqual(true);
    expect(wrapper.exists(Icon)).toEqual(false);
  });

  it('should render an icon if synced', () => {
    const { wrapper } = setup();
    wrapper.setProps({ synced: true });
    expect(wrapper.exists(Spinner)).toEqual(false);
    expect(wrapper.exists(Icon)).toEqual(true);
  });
});
