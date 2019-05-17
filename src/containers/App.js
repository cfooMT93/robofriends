import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    // Removed - using redux now which replaces these states for robots & searchfield
    // constructor() {
    //     super()
    //     this.state = {
    //         robots: []
    //         // Removed - we are now using redux store for state with searchField
    //         // searchfield: ''
    //     }
    // }

    componentDidMount() {
        // console.log(this.props.store.getState());
        
        // Removed - we're now using redux 
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response=> response.json())
        //     .then(users => this.setState({ robots: users }))

        this.props.onRequestRobots();
    }

    // Removed - we're now using redux which has a store we implemented with state and this part is within the Dispatch
    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })
    // }

    render () {
        // Removed searchField with this.state - we're using redux store state now
        // And now we can add const { searchField } = this.props; // instead of a state
        // also added onSearchChange for props as well, so we can remove the this.onSearchChange
        // const { robots, searchfield } = this.state;
        // also removing this.state for robots, since we added robots to the store
        // const { robots } = this.state;
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
            // Removed - using isPending props now 
            // return !robots.length ?
            return isPending ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                <h1 className='f1'>RobotFriends</h1>
                {/* <SearchBox searchChange={this.onSearchChange}/> */}
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
                </div>
            );
        }
    }


export default connect(mapStateToProps, mapDispatchToProps)(App);
