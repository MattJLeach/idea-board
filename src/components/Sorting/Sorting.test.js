import React from 'react';
import { shallow } from 'enzyme';
import Sorting from './Sorting';
import { checkProps } from '../../utils/testUtils';

const defaultProps = {
    currentSort: 'title',
    handleSortingChange: jest.fn()
}

let wrapper;
describe('component renders', () => {
    beforeEach(() => {
        wrapper = shallow(<Sorting { ...defaultProps } />);
    });
    it('renders without crashing', () => {
        expect(wrapper.length).toBe(1);
    });
    it('does not throw a warning with expected props', () => {
        checkProps('Sorting', defaultProps);
    });
    it('renders a dropdown for user input', () => {
        const dropdown = wrapper.find('[data-test="sorting"]');
        expect(dropdown.length).toBe(1);
    });
});

