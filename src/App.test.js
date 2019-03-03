import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { LocalStorageMock } from './utils/testUtils';

global.localStorage = new LocalStorageMock;

it('renders without crashing', () => {
    shallow(<App />);
});
describe('App component contents', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('renders a title', () => {
        const header = wrapper.find('[data-test="component-header"]');
        expect(header.text().length).not.toBe(0);
    });
})