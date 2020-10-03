import React, {Component} from "react";
import Person from "./Person/Person";

class Persons extends Component{
    static getDerivedStateFromProps(props,state) {
        console.log('[Person.js] getDerivedStateFromProps')
        return state
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('[Persons.js] componentWillReceiveProps', nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Person.js] shouldComponentUpdate')
        if (nextProps.persons !== this.props.persons) {
            return true
        }else {
            return false;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Person.js] getSnapshotBeforeUpdate')
        return {message:'Snapshot!'}
    }

    componentDidUpdate() {
        console.log('[Person.js] componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount')
    }

    render() {
        console.log('[Persons.js] rendering...')
        return this.props.persons.map((person, index) => {

            return <Person
                clickFunction={()=>this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
            />
        });
    }
}

export default Persons;