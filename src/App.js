import React, { Component } from 'react';
import './App.css';

import Form from './components/Form/Form';
import Sorting from './components/Sorting/Sorting';
import Card from './components/Card/Card';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            ideas: [],
            sortBy: 'updatedAt'
        }
    }

    componentWillMount = () => {
        this.setState(JSON.parse(localStorage.getItem('ideaState')));
    }

    onFormSubmit = data => {
        data.id = this.getNewId();
        const ideaArray = [...this.state.ideas];
        ideaArray.push(data);
        const newArray = this.sortIdeasArray(ideaArray);
        this.setStageAndLocalStorage({ ideas: newArray });
    }

    onCardDelete = id => {
        const ideaArray = [...this.state.ideas];
        const newArray = ideaArray.filter(x => x.id !== id);
        this.setStageAndLocalStorage({ ideas: newArray });
    }

    onSortChange = val => {
        this.setState({ sortBy: val }, () => {
            const ideaArray = [ ...this.state.ideas ];
            const newArray = this.sortIdeasArray(ideaArray);
            this.setStageAndLocalStorage({ ideas: newArray });
        });
    }

    setStageAndLocalStorage = state => {
        this.setState(state, () => {
            localStorage.setItem('ideaState', JSON.stringify(this.state));
        })
    }

    sortIdeasArray = array => {
        return array.sort((a,b) => (a[this.state.sortBy] > b[this.state.sortBy]) ? 1 : ((b[this.state.sortBy] > a[this.state.sortBy]) ? -1 : 0));
    }

    /**
     * Helper function to mimic getting a new ID from an API
     */
    getNewId = () => {
        let maxId = 0;
        this.state.ideas.forEach(idea => {
            if (idea.id > maxId) maxId = idea.id;
        });
        return maxId + 1;
    }

    render() {
        let showSort = this.state.ideas.length ? <Sorting currentSort={this.state.sortBy} handleSortingChange={this.onSortChange} /> : null;
        return (
            <div className="container">
                <h1 data-test="component-header" className="text-center">Idea Board</h1>
                <Form handleFormSubmit={this.onFormSubmit} />
                {showSort}
                <div>
                    {this.state.ideas.map(idea => {
                        return (
                            <Card key={idea.id} details={idea} onDeleteClick={this.onCardDelete} />
                        )
                    })}
                </div>
            </div>
        );
    }
}
