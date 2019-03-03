import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';
import { checkProps } from '../../utils/testUtils';

const defaultProps = {
    id: 1,
    details: {
        id: 1,
        title: 'Idea 1',
        description: 'Description for idea 1',
        updatedAt: 1551617120315
    },
    onDeleteClick: jest.fn()
}

let wrapper;
describe('component renders', () => {
    beforeEach(() => {
        wrapper = shallow(<Card { ...defaultProps } />);
    })
    it('renders without crashing', () => {
        expect(wrapper.length).toBe(1);
    });
    it('renders a non empty input box', () => {
        const titleInput = wrapper.find('[data-test="card-title"]');
        expect(titleInput.length).toBe(1);
        expect(titleInput.value).not.toBe('');
    });
    it('renders a non empty description box', () => {
        const descriptionInput = wrapper.find('[data-test="card-description"]');
        expect(descriptionInput.length).toBe(1);
        expect(descriptionInput.value).not.toBe('');
    });
    it('renders a delete button', () => {
        const deleteBtn = wrapper.find('[data-test="card-delete"]');
        expect(deleteBtn.length).toBe(1);
    });
});
describe('user interactions', () => {
    it('does not throw a warning with expected props', () => {
        checkProps('Card', defaultProps);
    });
    it('updates title on user input', () => {
        const titleInput = wrapper.find('[data-test="card-title"]');
        titleInput.value = 'Changed title';
        expect(titleInput.value).toBe('Changed title');
    });
    it('updates description on user input', () => {
        const descriptionInput = wrapper.find('[data-test="card-description"]');
        descriptionInput.value = 'Changed description';
        expect(descriptionInput.value).toBe('Changed description');
    });
    it('calls delete function when user clicks delete button', () => {
        const deleteBtn = wrapper.find('[data-test="card-delete"]');
        deleteBtn.simulate('click');
        wrapper.update();
        expect(defaultProps.onDeleteClick).toHaveBeenCalled();
    });
});