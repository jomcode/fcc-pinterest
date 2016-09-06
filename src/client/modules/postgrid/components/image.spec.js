import React from 'react';
import { shallow, mount } from 'enzyme';

import Image from './image';

const props = {
  imageUrl: 'fake url'
};

describe('<Image /> component', () => {
  it('renders <img>', () => {
    const wrapper = shallow(<Image {...props} />);

    expect(wrapper.find('img')).to.have.length(1);
  });

  it('renders proper <img> when error', () => {
    const placeholder = 'https://placehold.it/250x150';

    const wrapper = mount(<Image {...props} />);

    const img = wrapper.find('img');
    img.simulate('error');

    expect(img.prop('src')).to.equal(placeholder);
  });

  describe('#_onError', () => {
    it('sets state when error event occurs', () => {
      const initialState = { error: false };
      const expectedState = { error: true };
      const wrapper = mount(<Image {...props} />);

      expect(wrapper.state()).to.deep.equal(initialState);

      const img = wrapper.find('img');
      img.simulate('error');

      expect(wrapper.state()).to.deep.equal(expectedState);
    });
  });
});
