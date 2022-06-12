import React from 'react';
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import LoginForm from './components/Auth.js'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const DOMAIN = 'http://127.0.0.1:8000'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
            navbarItems: [
                {name: 'Users', href: '/users'},
                {name: 'Projects', href: '/projects'},
                {name: 'ToDos', href: '/todos'},
              //  {name: 'Login', href: '/login'},
            ],
            'users': [],
            'projects': [],
            'todos': [],
            'project': {},
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }
    
    is_authenticated() {
        return this.state.token != ''
    }
    
    logout() {
        this.set_token('')
    }


    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }
      

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            //console.log(response.data)
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
      }


    render () {
        return (
            <div className="App">
                <BrowserRouter>
                    <header>
                        <li>
                            {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                        </li>
                        <Header navbarItems={this.state.navbarItems} />
                    </header>
                    <Switch>
                        <Route exact path='/users' component={() => <UserList users={this.state.users} />}  />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />}  />
                        <Route exact path='/todos' component={() => <ToDoList items={this.state.todos} />}  />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}  />
                        <Route path="/project/:id" children={<ProjectDetail getProject={(id) => this.getProject(id)} item={this.state.project} />} />
                    </Switch>
   
                    <Footer/>
                </BrowserRouter>    
            </div>
        )
    }
  
    getProject(id) {

        axios.get(get_url(`/api/projects/${id}`))
        .then(response => {
            console.log(response.data)
            this.setState({project: response.data})
        }).catch(error => console.log(error))
    }

   
          //  const users = [
    //      {
    //          'username': 'admin',
    //          'first_name': 'Ivanov',
    //          'last_name': 'Ivan',
    //          'email': 'ivanov@mail.ru'
    //     },
    //      {
    //        'username': 'admin1',
    //        'first_name': 'Petrov',
    //        'last_name': 'Petr',
    //        'email': 'petrov@mail.ru'
    //      },
    // ]
    //  this.setState(
    //      {
    //          'users': users
    //      }
    //  )

    get_headers() {
        let headers = {
          'Content-Type': 'application/json'
        }
      if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {

        const headers = this.get_headers()
        axios.get(get_url('/api/users/'), {headers})
            .then(response => {
                //console.log(response.data.results)
                this.setState({'users': response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({users: []})
            })
        axios.get(get_url('/api/projects/'), {headers})
            .then(response => {
                this.setState({'projects': response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
        axios.get(get_url('/api/todos/'), {headers})
            .then(response => {
                this.setState({'todos': response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }

    componentDidMount() {
        this.get_token_from_storage()
       // this.load_data()
    }
}

export default App;