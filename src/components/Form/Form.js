import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: []
        }
    }

    componentWillMount = () => {
        this.resetState();
    }

    resetState = () => {
        const blankForm = [
            {
                element: 'title',
                label: 'Title',
                value: '',
                focus: true,
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
                focus: false,
                dataTest: 'form-description',
                isValid: true,
                errorMessage: 'Please enter a description (max 140 characters)',
                validationRules: {
                    isRequired: true,
                    maxLength: 140
                }
            }
        ];
        this.setState({ form: blankForm });
    }

    handleInput = e => {
        const details = [ ...this.state.form ];
        const elementIndex = details.findIndex(x => x.element === e.target.id);
        details[elementIndex].value = e.target.value;
        this.setState({ form: details });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        let formDetails = [ ...this.state.form ];
        let errors = [];
        formDetails.forEach(field => {
            field.isValid = true;
            if(field.validationRules.isRequired) {
                field.isValid = field.value !== '' && field.validationRules.isRequired;
            }
            if(field.validationRules.maxLength) {
                field.isValid = field.value.length <= field.validationRules.maxLength;
            }
            if(!field.isValid) {
                errors.push(field.isValid);
            }
        });
        this.setState({form: formDetails});
        if(errors.length) {
            return;
        }
        const detailsToSubmit = {
            title: this.state.form[0].value,
            description: this.state.form[1].value,
            updatedAt: Date.now()
        }
        this.props.handleFormSubmit(detailsToSubmit);
        this.resetState();
    }

    elementError = (el) => {
        const dataTest = el.dataTest + '-error';
        return !el.isValid ? <small data-test={dataTest} className="text-danger">{el.errorMessage}</small> : null;
    }

    characterCounter = (id) => {
        const description = this.state.form.find(x => x.element === 'description');
        const value = description.validationRules.maxLength - description.value.length;
        const classNames = value < 0 ? 'pull-right text-danger' : 'pull-right';
        return id === 'description' ? <small data-test="form-character-counter" className={classNames}>{value}</small> : null;
    }

    getRef = el => {
        return `(input) => { this.${el.element} = input; }`;
    }

    render() {
        let form = (
            <form data-test="form" className="form-horizontal" onSubmit={this.handleFormSubmit}>
                {this.state.form.map(el => {
                    return (
                        <div key={el.element} className="form-group">
                            <label htmlFor={el.element} className="col-sm-2 control-label">{el.label}</label>
                            <div className="col-sm-10">
                                <input 
                                    data-test={el.dataTest} 
                                    autoFocus={el.focus}
                                    type="text" 
                                    className="form-control" 
                                    id={el.element} 
                                    value={el.value} 
                                    onChange={this.handleInput} />
                                <span>{this.elementError(el)}</span>{this.characterCounter(el.element)}
                            </div>
                        </div>
                    )
                })}
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button data-test="form-submit" type="submit" className="btn btn-primary">Add Item</button>
                    </div>
                </div>
            </form>
        )
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {form}
                </div>
            </div>
        )
    }
}

Form.propTypes = {
    handleFormSubmit: PropTypes.func.isRequired
}

export default Form;