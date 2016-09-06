import React from 'react';
import { shallow, mount } from 'enzyme';

import Post from './post';
import Image from './image';

const setup = () => {
  const common = {
    imageUrl: 'fake url',
    title: 'fake title',
    userId: 'userId1',
    username: 'fake username',
    isOwner: false,
    isFetching: false,
    postId: 'postId1',
    removeHandler: sinon.spy()
  };

  const getProps = () => ({
    common: () => Object.assign({}, common),
    owner: () => Object.assign({}, common, { isOwner: true }),
    loading: () => Object.assign({}, common, { isOwner: true, isFetching: true })
  });

  return { getProps };
};

describe('<Post /> component', () => {
  it('renders an <Image /> component', () => {
    const props = setup().getProps().common();

    const wrapper = shallow(<Post {...props} />);

    expect(wrapper.find(Image)).to.have.length(1);
  });

  describe('<button>Remove</button>', () => {
    it('renders a remove button if user is owner of post', () => {
      const props = setup().getProps().owner();

      const wrapper = shallow(<Post {...props} />);

      expect(wrapper.find('button')).to.have.length(1);
    });

    it('does not render a remove button if user is not owner of post', () => {
      const props = setup().getProps().common();

      const wrapper = shallow(<Post {...props} />);

      expect(wrapper.find('button')).to.have.length(0);
    });

    it('disables remove button when fetching', () => {
      const props = setup().getProps().loading();

      const wrapper = shallow(<Post {...props} />);

      expect(wrapper.find('button').prop('disabled')).to.equal(true);
    });

    it('calls #_handleRemove when clicked', () => {
      const props = setup().getProps().owner();

      sinon.spy(Post.prototype, '_handleRemove');

      const wrapper = mount(<Post {...props} />);

      const removeButton = wrapper.find('button');
      removeButton.simulate('click');

      expect(Post.prototype._handleRemove.calledOnce).to.equal(true);
      Post.prototype._handleRemove.restore();
    });
  });

  describe('#_handleRemove', () => {
    it('calls removeHandler with expected arg', () => {
      const expectedArg = 'postId1';
      const props = setup().getProps().owner();

      const wrapper = mount(<Post {...props} />);

      const removeButton = wrapper.find('button');
      removeButton.simulate('click');

      expect(props.removeHandler.calledOnce).to.equal(true);
      expect(props.removeHandler.calledWith(expectedArg)).to.equal(true);
    });
  });
});
