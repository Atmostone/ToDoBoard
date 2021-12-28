import React from 'react'
import axios from 'axios'
import './App.css';
import ProjectList from './components/Project.js'
import LoginForm from './components/Auth.js'
import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom'
import Cookies from 'universal-cookie'
import ToDoList from "./components/ToDo";
import ToDoForm from "./components/ToDoForm";


const Page404 = ({location}) => {
    return <div>
        Page {location.pathname} not found.
    </div>
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'todos': [],
            'users': [],
            'token': ''
        }
    }

    is_auth() {
        return !!this.state.token
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }


    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(
                response => {
                    const projects = response.data
                    this.setState({
                        'projects': projects
                    })
                }
            ).catch(
            error => {
                this.setState({
                    'projects': []
                })
                console.log(error)
            }
        )

        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(
                response => {
                    const todos = response.data
                    this.setState({
                        'todos': todos
                    })
                }
            ).catch(
            error => {
                this.setState({
                    'todos': []
                })
                console.log(error)
            }
        )
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(
                response => {
                    const users = response.data
                    this.setState({
                        'users': users
                    })
                }
            ).catch(
            error => {
                this.setState({
                    'users': []
                })
                console.log(error)
            }
        )
    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {
                "username": login,
                "password": password
            })
            .then(
                response => {
                    const cookie = new Cookies()
                    cookie.set('token', response.data.token)
                    this.setState({'token': response.data.token}, this.get_data)

                }
            ).catch(
            error => console.log(error)
        )
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }


    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }


    componentDidMount() {
        this.get_token_from_storage()
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((todo) => todo.id !== id)})
            }).catch(error => console.log(error))
    }

    createToDo(text, project, created_by) {
        const headers = this.get_headers()
        const data = {text: text, project: project, created_by: created_by, status: true}

        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id === new_todo.project)[0].id
                new_todo.project = project

                const created_by = this.state.users.filter((item) => item.id === new_todo.created_by)[0]
                new_todo.created_by = created_by

                this.setState({todos: [...this.state.todos, new_todo]});

            }).catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDos</Link>
                            </li>
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <ProjectList projects={this.state.projects}/>}/>

                        <Route exact path='/todos/create'
                               component={() => <ToDoForm projects={this.state.projects} users={this.state.users}
                                                          createToDo={(text, project, created_by) => this.createToDo(text, project, created_by)}/>}/>

                        <Route exact path='/todos'
                               component={() => <ToDoList todos={this.state.todos}
                                                          deleteToDo={(id) => this.deleteToDo(id)}/>}/>

                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(login, password) => this.get_token(login, password)}/>}/>
                        <Redirect from='/projects' to='/'/>
                        <Route component={Page404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;