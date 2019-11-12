import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LastModified from './LastModified-view';
import SyncedStatus from '../SyncedStatus';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = shallow(
    <LastModified synced={undefined} user={undefined} date={undefined} />
  );

  return { wrapper };
}

describe('LastModified component', () => {
  it('should render the last modified component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists(SyncedStatus)).toEqual(false);
    wrapper.setProps({ user: {} });
    expect(wrapper.exists(SyncedStatus)).toEqual(true);
  });
});
