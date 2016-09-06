import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { shallow, mount } from 'enzyme';

import { CreatePost } from './createpost';
import CreatePostForm from './createpostform';

const setup = () => {
  const common = {
    dispatch: sinon.spy(),
    actions: {
      resetCreatePost: sinon.spy(),
      createNewPost: sinon.spy()
    },
    createPost: { isFetching: false, isSuccessful: false },
    userId: 'userId1',
    router: {
      push: sinon.spy(),
      replace: sinon.spy(),
      go: sinon.spy(),
      goBack: sinon.spy(),
      goForward: sinon.spy(),
      setRouteLeaveHook: sinon.spy(),
      isActive: sinon.spy()
    }
  };

  const getProps = () => ({
    common: Object.assign({}, common),

    loading: Object.assign({}, common, {
      createPost: { isFetching: true, isSuccessful: false }
    }),

    successful: Object.assign({}, common, {
      createPost: { isFetching: false, isSuccessful: true }
    })
  });

  const getWrapper = (props) => ({
    shallow: () => shallow(<CreatePost {...props} />),
    full: () => mount(<CreatePost {...props} />)
  });

  const getStore = () => {
    const rootReducer = combineReducers({
      form: formReducer
    });

    const store = createStore(rootReducer);

    return store;
  };

  return { getProps, getWrapper, getStore };
};

describe('<CreatePost /> component', () => {
  it('renders a <CreatePostForm /> component', () => {
    const props = setup().getProps().common;
    const wrapper = setup().getWrapper(props).shallow();

    expect(wrapper.find(CreatePostForm)).to.have.length(1);
  });

  describe('#componentDidUpdate', () => {
    it('calls router.push if createPost.isSuccessful', () => {
      const initialProps = setup().getProps().successful;

      sinon.spy(CreatePost.prototype, 'componentDidUpdate');

      const wrapper = mount(
        <Provider store={setup().getStore()}>
          <CreatePost {...initialProps} />
        </Provider>
      );

      wrapper.setProps(initialProps);

      const expectedRoute = `/posts/users/${initialProps.userId}`;

      expect(CreatePost.prototype.componentDidUpdate.calledOnce).to.equal(true);
      expect(initialProps.router.push.calledOnce).to.equal(true);
      expect(initialProps.router.push.calledWith(expectedRoute)).to.equal(true);

      CreatePost.prototype.componentDidUpdate.restore();
    });

    it('dispatches RESET_CREATE_POST if createPost.isSuccessful', () => {
      const initialProps = setup().getProps().successful;

      sinon.spy(CreatePost.prototype, 'componentDidUpdate');

      const wrapper = mount(
        <Provider store={setup().getStore()}>
          <CreatePost {...initialProps} />
        </Provider>
      );

      wrapper.setProps(initialProps);

      expect(CreatePost.prototype.componentDidUpdate.calledOnce).to.equal(true);
      expect(initialProps.dispatch.calledOnce).to.equal(true);
      expect(initialProps.actions.resetCreatePost.calledOnce).to.equal(true);

      CreatePost.prototype.componentDidUpdate.restore();
    });
  });

  describe('#_handleSubmit', () => {
    it('dispatches CREATE_POST if valid data is passed', () => {
      const fakePost = {
        userId: 'userId1',
        title: 'fake title',
        imageUrl: 'fake url'
      };

      const props = setup().getProps().common;

      sinon.spy(CreatePost.prototype, '_handleSubmit');

      const wrapper = mount(
        <Provider store={setup().getStore()}>
          <CreatePost {...props} />
        </Provider>
      );

      const submitButton = wrapper.find('[type="submit"]');
      const titleInput = wrapper.find('[name="title"]');
      const imageUrlInput = wrapper.find('[name="imageUrl"]');

      // https://github.com/erikras/redux-form/blob/master/src/events/isEvent.js
      titleInput.simulate('change', {
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
        target: {
          value: 'fake title'
        }
      });

      imageUrlInput.simulate('change', {
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
        target: {
          value: 'fake url'
        }
      });

      submitButton.simulate('submit');

      expect(CreatePost.prototype._handleSubmit.calledOnce).to.equal(true);
      expect(props.dispatch.calledOnce).to.equal(true);
      expect(props.actions.createNewPost.calledWith(fakePost)).to.equal(true);

      CreatePost.prototype._handleSubmit.restore();
    });

    it('does not dispatch if invalid data is passed', () => {
      const props = setup().getProps().common;

      sinon.spy(CreatePost.prototype, '_handleSubmit');

      const wrapper = mount(
        <Provider store={setup().getStore()}>
          <CreatePost {...props} />
        </Provider>
      );

      const submitButton = wrapper.find('[type="submit"]');

      submitButton.simulate('submit');

      expect(CreatePost.prototype._handleSubmit.calledOnce).to.equal(true);
      expect(props.dispatch.calledOnce).to.equal(false);

      CreatePost.prototype._handleSubmit.restore();
    });
  });
});
