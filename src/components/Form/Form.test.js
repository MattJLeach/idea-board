import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import { checkProps } from '../../utils/testUtils';

const defaultProps = {
    handleFormSubmit: jest.fn()
}

let wrapper, formState;
describe('component renders', () => {
    beforeEach(() => {
        wrapper = shallow(<Form {...defaultProps} />);
    });
    it('renders without crashing', () => {
        expect(wrapper.length).toBe(1);
    });
    it('does not throw a warning with expected props', () => {
        checkProps('Form', defaultProps);
    });
    it('renders an input box for the title', () => {
        const titleInput = wrapper.find('[data-test="form-title"]');
        expect(titleInput.length).toBe(1);
    });
    it('renders an input box for the description', () => {
        const descriptionInput = wrapper.find('[data-test="form-description"]');
        expect(descriptionInput.length).toBe(1);
    });
    it('renders a submit button', () => {
        const button = wrapper.find('[data-test="form-submit"]');
        expect(button.length).toBe(1);
    });
});

describe('user enters invalid form data', () => {
    beforeEach(() => {
        wrapper = shallow(<Form {...defaultProps} />);
        formState = [
            {
                element: 'title',
                label: 'Title',
                value: '',
                dataTest: 'form-title',
                isValid: true,
                errorMessage: 'Please enter a title',
                validationRules: {
                    isRequired: true
                }
            },
            {
                element: 'description',
                label: 'Description',
                value: '',
                dataTest: 'form-description',
                isValid: false,
                errorMessage: 'Please enter a description (max 140 characters)',
                validationRules: {
                    isRequired: true,
                    maxLength: 140
                }
            }
        ]
    });
    it('renders a non empty error message when no title is given', () => {
        formState[0].isValid = false;
        wrapper.setState({ form: formState });
        wrapper.update();
        const error = wrapper.find('[data-test="form-title-error"]');
        expect(error.length).toBe(1);
    });
    it('renders a non empty error message when no description is given', () => {
        formState[1].isValid = false;
        wrapper.setState({ form: formState });
        wrapper.update();
        const error = wrapper.find('[data-test="form-description-error"]');
        expect(error.length).toBe(1);
    });
    it('renders a non empty error message when a description is too long', () => {
        formState[1].value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat pellentesque augue, at blandit nulla volutpat eu. Morbi nulla est.';
        wrapper.setState({ form: formState });
        wrapper.update();
        const error = wrapper.find('[data-test="form-description-error"]');
        expect(error.length).toBe(1);
    });
    it('renders a negative charater\'s left value when description is more than the `maxLength` value', () => {
        const descriptionInput = wrapper.find('[data-test="form-description"]');
        descriptionInput.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat pellentesque augue, at blandit nulla volutpat eu. Morbi nulla est.';
        descriptionInput.simulate('change', { target: { value: descriptionInput.value, id: 'description' } });
        const counter = wrapper.find('[data-test="form-character-counter"]');
        expect(counter.text()).toBe('-2');
    });
});

describe('user submits valid form data', () => {
    beforeEach(() => {
        wrapper = shallow(<Form {...defaultProps} />);
        formState = [
            {
                element: 'title',
                label: 'Title',
                value: 'Valid title',
                dataTest: 'form-title',
                isValid: true,
                errorMessage: 'Please enter a title',
                validationRules: {
                    isRequired: true
                }
            },
            {
                element: 'description',
                label: 'Description',
                value: 'Valid description',
                dataTest: 'form-description',
                isValid: true,
                errorMessage: 'Please enter a description (max 140 characters)',
                validationRules: {
                    isRequired: true,
                    maxLength: 140
                }
            }
        ]
    });
    it('calls the `handleFormSubmit` function when form is submitted', () => {
        wrapper.setState({ form: formState});
        const form = wrapper.find('[data-test="form"]');
        form.simulate('submit', new Event('submit'));
        wrapper.update();
        expect(defaultProps.handleFormSubmit).toHaveBeenCalled();
    });
});