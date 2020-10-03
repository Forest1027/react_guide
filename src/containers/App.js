import React, {Component} from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/WithClass'
import Aux from '../hoc/Auxiliary'
import AuthContext from '../context/auth-context'

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] constructor')
    }

    state = {
        persons: [
            {id: 'name1', name: 'Max', age: 28},
            {id: 'name2', name: 'Manu', age: 29},
            {id: 'name3', name: 'Maggie', age: 26}
        ],
        otherState: 'some value',
        showPersons: false,
        showCockpit: true,
        changeCounter:0,
        authenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props)
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount')
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[App.js] shouldComponentUpdate')
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[App,js] componentDidUpdate')
    }

    componentWillMount() {
        console.log('[App.js] componentWillMount')
    }

    switchNameHandler = (newName) => {
        console.log('Was clicked.');
        //this.state.persons[0].name='xixi'
        this.setState({
            persons: [
                {name: newName, age: 22},
                {name: 'Annie', age: 22},
                {name: 'Jack', age: 22}
            ]
        })
    }
    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex((p) => {
            return p.id === id
        })
        const person = {...this.state.persons[personIndex]}
        person.name = event.target.value;
        const persons = [...this.state.persons]
        persons[personIndex] = person;
        // best practice for state update depending on previous state
        this.setState((prevState, props)=>{
            return{
                persons: persons,
                changeCounter:prevState.changeCounter+1
            }
        })
    }

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons
        this.setState({showPersons: !doesShow})
    }

    deletePersonHandler = (personIndex) => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons]
        persons.splice(personIndex, 1);
        this.setState({persons: persons});

    }

    loginHandler = () => {
        this.setState({authenticated:true})
    }

    render() {
        console.log('[App.js] render')
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <Persons persons={this.state.persons} clicked={this.deletePersonHandler}
                         changed={this.nameChangedHandler}
                         isAuthenticated={this.state.authenticated}
                />
            )
        }

        return (
            <Aux>
                <button onClick={()=>this.setState({ showCockpit: false})}>Remove Cockpit</button>
                <AuthContext.Provider value={{authenticated: this.state.authenticated, login:this.loginHandler}}>
                    {this.state.showCockpit?(
                        <Cockpit title={this.props.appTitle}
                                 showPerson={this.state.showPersons}
                                 personsLength={this.state.persons.length}
                                 clicked={this.togglePersonHandler}
                        />
                    ):null}
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
}

export default withClass(App, (classes.App));