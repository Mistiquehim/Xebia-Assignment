import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Login from './Login'
import configureStore from 'redux-mock-store'

const initialState = {};
const mockStore = configureStore();
let store = mockStore(initialState); 

const wrapper = shallow(<Login.WrappedComponent store={store}/>);

describe('Login Component', () => {
    it('renders h2', () => {
        expect(wrapper.find('h2').text()).toEqual('Login to Star Wars')
    });
    it('renders submit button', () => {
        expect(wrapper.find('button').text()).toEqual('Login')
    });
});