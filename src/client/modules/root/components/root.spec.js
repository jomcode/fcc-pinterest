import React from 'react';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { shallow } from 'enzyme';

import Root from './root';
import configureStore from '../../../config/configurestore';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

describe('<Root /> component', () => {
  it('renders a <Provider />', () => {
    const wrapper = shallow(<Root store={store} history={history} />);
    expect(wrapper.find('Provider')).to.have.length(1);
  });

  it('renders a <Router />', () => {
    const wrapper = shallow(<Root store={store} history={history} />);
    expect(wrapper.find('Router')).to.have.length(1);
  });
});
