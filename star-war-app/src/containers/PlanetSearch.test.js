import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import PlanetSearch from './PlanetSearch'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'

const initialState = {};
const mockStore = configureStore();
let store = mockStore(initialState);

describe('PlanetSearch Component', () => {
    it('should dispatch action when doing search', () => {
        const props = {
            searchPlanet: sinon.spy(),
        }
        const wrapper = mount(<PlanetSearch.WrappedComponent store={store} {...props} />);
        const searchWrapper = wrapper.find('Search').first();
        
        searchWrapper.find('input').simulate('change')

        expect(props.searchPlanet.calledOnce).to.equal(true)
    })
});