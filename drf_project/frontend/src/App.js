import React from 'react';
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import LoginForm from './components/Auth.js'
import axios from 'axios'
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
                {name: 'Login', href: '/login'},
            ],
            'users': [],
            'projects': [],
            'todos': [],
            'project': {},
        }
    }


    render () {
        return (
            <div className="App">
                <BrowserRouter>
                    <header>
                        <Header navbarItems={this.state.navbarItems} />
                    </header>
                    <Switch>
                        <Route exact path='/users' component={() => <UserList users={this.state.users} />}  />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />}  />
                        <Route exact path='/todos' component={() => <ToDoList items={this.state.todos} />}  />
                        <Route exact path='/login' component={() => <LoginForm />}  />
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

    load_data() {
        axios.get(get_url('/api/users/'))
            .then(response => {
                //console.log(response.data.results)
                this.setState({'users': response.data.results})
            }).catch(error => console.log(error))
        axios.get(get_url('/api/projects/'))
            .then(response => {
                this.setState({'projects': response.data.results})
            }).catch(error => console.log(error))
        axios.get(get_url('/api/todos/'))
            .then(response => {
                this.setState({'todos': response.data.results})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.load_data()
    }
}

export default App;