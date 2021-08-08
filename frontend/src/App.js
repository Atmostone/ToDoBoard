import React from 'react';
import axios from 'axios';
import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import ProjectList from "./components/Project";
import UserList from "./components/User";
import ToDoList from "./components/ToDo";
import ProjectToDos from "./components/ProjectToDos";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data.results;
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDos</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/users' component={() =>
                            <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() =>
                            <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() =>
                            <ToDoList todos={this.state.todos}/>}/>
                        <Route path="/project/:url">
                            <ProjectToDos todos={this.state.todos}/>
                        </Route>
                        <Redirect from='/' to='/todos'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;