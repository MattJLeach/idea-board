import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Sorting extends Component {
    // constructor(props) {
    //     super(props);
    // }

    handleSortChange = e => {
        this.props.handleSortingChange(e.target.value);
    }

    render() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="sorting" className="col-sm-2 control-label">Select Sort</label>
                    <div className="col-sm-4">
                        <select data-test="sorting" id="sorting" className="form-control" onChange={this.handleSortChange} value={this.props.currentSort}>
                            <option value="title">Alphabetically</option>
                            <option value="updatedAt">Creation Date</option>
                        </select>
                    </div>
                </div>
            </form>
        )
    }
}

Sorting.propTypes = {
    currentSort: PropTypes.string.isRequired,
    handleSortingChange: PropTypes.func.isRequired
}

export default Sorting;