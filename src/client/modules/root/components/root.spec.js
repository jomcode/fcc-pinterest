import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Root from './root';

describe('<Root /> component', () => {
  describe('<Root /> component shallow rendered', () => {
    it('renders a div', () => {
      const wrapper = shallow(<Root />);
      expect(wrapper.find('div')).to.have.length(1);
    });

    it('renders a <h1> with expected contents', () => {
      const wrapper = shallow(<Root />);
      expect(wrapper.contains(<h1>root.jsx</h1>)).to.equal(true);
    });
  });

  describe('<Root /> component full DOM rendered', () => {
    it('calls componentDidMount', () => {
      sinon.spy(Root.prototype, 'componentDidMount');
      mount(<Root />);
      expect(Root.prototype.componentDidMount.calledOnce).to.equal(true);
      Root.prototype.componentDidMount.restore();
    });
  });

  describe('<Root /> component static rendered', () => {
    it('renders a <h1> with expected contents', () => {
      const wrapper = render(<Root />);
      expect(wrapper.find('h1').text()).to.contain('root.jsx');
    });
  });
});
