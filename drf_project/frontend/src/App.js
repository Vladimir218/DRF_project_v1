import React from 'react';
import UserList from './components/User.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import axios from 'axios'

const DOMAIN = 'http://127.0.0.1:8000'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        navbarItems: [
            {name: 'About', href: get_url('/api/')},
            {name: 'Users', href: '/'},
            {name: 'Login', href: '/'},
        ],
        'users': []
      }
  }


  render () {
      return (
          <div>
                <header>
                    <Header navbarItems={this.state.navbarItems} />
                </header>
                <body>
                    <UserList users={this.state.users} />   
                </body>
                
                <Footer/>
          </div>
         
      )
  }
  
  
  componentDidMount() {
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
        axios.get(get_url('/api/users/'))
            .then(response => {
                this.setState({'users': response.data})
            }).catch(error => console.log(error))
  }
}

export default App;