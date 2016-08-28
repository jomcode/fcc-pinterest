import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';

class Foo extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="foo">
        <p>{this.props.testText}</p>
        <button onClick={this.props.testHandler} />
        {this.props.children}
      </div>
    );
  }
}

const sanityCheck = process.env.SANITY === 'enabled' ?
  describe :
  describe.skip;

sanityCheck('sanity test', () => {
  it('works', () => {
    expect(true).to.equal(true);
  });

  describe('<Foo /> shallow rendered', () => {
    it('renders a <div> with class \'foo\'', () => {
      const wrapper = shallow(<Foo />);
      expect(wrapper.find('.foo')).to.have.length(1);
    });

    it('renders a <p> with value passed via props', () => {
      const wrapper = shallow(<Foo testText="testing123" />);
      expect(wrapper.contains(<p>testing123</p>)).to.equal(true);
    });

    it('simulates click events', () => {
      const clickSpy = sinon.spy();
      const wrapper = shallow(<Foo testHandler={clickSpy} />);
      wrapper.find('button').simulate('click');
      expect(clickSpy.calledOnce).to.equal(true);
    });

    it('renders children when passed via props', () => {
      const wrapper = shallow(<Foo><div className="bar" /></Foo>);
      expect(wrapper.contains(<div className="bar" />)).to.equal(true);
    });
  });

  describe('<Foo /> full DOM rendered', () => {
    it('accepts new props after initial render', () => {
      const wrapper = mount(<Foo bar="baz" />);
      expect(wrapper.props().bar).to.equal('baz');
      wrapper.setProps({ bar: 'foo' });
      expect(wrapper.props().bar).to.equal('foo');
    });

    it('simulates click events', () => {
      const clickSpy = sinon.spy();
      const wrapper = mount(<Foo testHandler={clickSpy} />);
      wrapper.find('button').simulate('click');
      expect(clickSpy.calledOnce).to.equal(true);
    });

    it('calls componentDidMount', () => {
      sinon.spy(Foo.prototype, 'componentDidMount');
      mount(<Foo />);
      expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);
      Foo.prototype.componentDidMount.restore();
    });
  });

  describe('<Foo /> static rendered markup', () => {
    it('renders a <div> with class \'foo\'', () => {
      const wrapper = render(<Foo />);
      expect(wrapper.find('.foo')).to.have.length(1);
    });

    it('renders the test text', () => {
      const wrapper = render(<Foo testText="testing123" />);
      expect(wrapper.find('p').text()).to.contain('testing123');
    });
  });
});
