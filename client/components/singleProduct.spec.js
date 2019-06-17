// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
const chaiSpies = require('chai-spies')
const sinon = require('sinon')
chai.use(chaiThings)
chai.use(chaiSpies)

// Components
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({adapter: new Adapter()})
import SingleProduct from './singleproduct'

// import { connect } from 'react-redux'
import configureStore from 'redux-mock-store'
const initialState = {}
const mockStore = configureStore()

// describe('front end', () => {
//   describe('<SingleProduct /> component', () => {

//   let renderedSingleProduct;
//   let SingleProductInstance;
//   let store;
//   beforeEach(() => {

//     store = mockStore(initialState)
//     renderedSingleProduct = shallow(<SingleProduct store={store}/>);
//     SingleProductInstance = renderedSingleProduct.instance();

//   });

//   it('is a class component with an initial local state', () => {
//     expect(SingleProductInstance).to.exist;
//     // expect(campusInputInstance.state).to.eql({ name: '' });
//   });

// });

// });

//Invariant Violation: Could not find "store" in the context of "Connect(SingleProduct)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(SingleProduct) in connect options.

// import Gravatar from '../lib/gravatar';
// import Avatar from '../lib/avatar';
// import Email from '../lib/email';

// describe('<Gravatar />', () => {
//   it('contains an <Avatar/> component', function () {
//     const wrapper = mount(<Gravatar/>);
//     expect(wrapper.find(Avatar)).to.have.length(1);
//   });

//   it('contains an <Email/> component', function () {
//     const wrapper = mount(<Gravatar/>);
//     expect(wrapper.find(Email)).to.have.length(1);
//   });

//   it('should have an initial email state', function () {
//     const wrapper = mount(<Gravatar/>);
//     expect(wrapper.state().email).to.equal('someone@example.com');
//   });

// describe('Component Foo', function() {
//     it ('should have a class named foo', function() {
//     const wrapper = shallow(<Foo />);
//     expect(wrapper.is(‘.foo')).to.equal(true);
//     })
//    it(‘should have two children’, function() {
//     const wrapper = shallow(<Foo />);
//     expect(wrapper.children().length).to.equal(2)
//     })
//    it(‘should have children with a class named bar’, function() {
//     const wrapper = shallow(<Foo />);
//     expect(wrapper.children(‘.bar’).length).to.equal(2);
//     })
//    })
