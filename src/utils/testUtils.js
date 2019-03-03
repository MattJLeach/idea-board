import checkPropTypes from 'check-prop-types';

/**
 * Function to test prop types of a component
 * @param {ReactComponent} component 
 * @param {object} props 
 */
export const checkProps = (component, props) => {
    const propError = checkPropTypes(component.propTypes, props, 'prop', component.name);
    expect(propError).toBeUndefined();
}

/**
 * Class to mock the functionality of localStorage for testing purposes
 */
export class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    getItem = key => {
        return this.store[key] || null;
    }

    setItem = (key, value) => {
        this.store[key] = value.toString();
    }
};