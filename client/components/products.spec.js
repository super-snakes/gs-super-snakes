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
import Products from './Products'

import configureStore from 'redux-mock-store'
const initialState = {}
const mockStore = configureStore()

describe('Product component', () => {
  describe('<Products /> component', () => {
    let renderedProductsComponent
    let productsComponentInstance
    let store
    beforeEach(() => {
      store = mockStore(initialState)
      renderedProductsComponent = shallow(<Products store={store} />)
      productsComponentInstance = renderedProductsComponent.instance()
    })

    xit('is a class component with an initial local state', () => {
      expect(productsComponentInstance).to.exist
      expect(productsComponentInstance.state).to.be.null
    })
  })
})

// it('should have props for email and src', function () {
//     const wrapper = shallow(<Avatar/>);
//     expect(wrapper.props().email).to.be.defined;
//     expect(wrapper.props().src).to.be.defined;
//   });
// });

// describe('Front-End', () => {

//     const campuses = [
//       { name: 'New York' },
//       { name: 'Chicago' },
//       { name: 'Pluto' }
//     ];
//     // defined in ../client/components/CampusList.js
//     describe('<CampusList /> component', () => {
//       it('renders an unordered list', () => {
//         const wrapper = shallow(<CampusList campuses={[]} />);
//         expect(wrapper.find('ul')).to.have.length(1);
//       })

//       it('renders list items for the campuses passed in as props', async () => {
//         const campusRecords = await Campus.bulkCreate(campuses)
//         //we are creating the campuses in the database so the extra credit in tier-4 doesn't break this spec.
//         const wrapper = shallow(<CampusList campuses={campusRecords} />);
//         const listItems = wrapper.find('li');
//         expect(listItems).to.have.length(3);
//         expect(listItems.at(2).text()).to.contain('Pluto');
//       });
//     });
