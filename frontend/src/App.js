import React from 'react'
import axios from 'axios'
import './App.css';
import ProjectList from './components/Project.js'
import ToDoList from './components/ToDo.js'
import LoginForm from './components/Auth.js'
import {HashRouter, Link, Redirect, Route, Switch} from 'react-router-dom'
import Cookies from 'universal-cookie'


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

    render() {
        return (
            <div>
                <HashRouter>
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
                        <Route exact path='/todos'
                               component={() => <ToDoList todos={this.state.todos} projects={this.state.projects}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(login, password) => this.get_token(login, password)}/>}/>
                        <Redirect from='/projects' to='/'/>
                        <Route component={Page404}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App;