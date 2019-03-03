import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props.details }
    }

    handleTitleInput = e => {
        this.setState({title: e.target.value});
    }

    handleDescriptionInput = e => {
        this.setState({description: e.target.value});
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="form-group">
                        <input data-test="card-title" className="form-control" value={this.state.title} onChange={this.handleTitleInput} />
                    </div>
                    <div className="form-group">
                        <textarea data-test="card-description" className="form-control" value={this.state.description} onChange={this.handleDescriptionInput} />
                    </div>
                    <small>{moment(this.state.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</small>
                    <div className="form-group">
                        <button data-test="card-delete" className="btn btn-danger pull-right" onClick={() => this.props.onDeleteClick(this.state.id)}>Delete</button>
                    </div>
                </div >
            </div >
        )
    }
}

Card.propTypes = {
    details: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        updatedAt: PropTypes.number.isRequired
    }).isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default Card;