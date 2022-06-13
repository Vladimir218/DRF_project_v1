import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
      super(props)
      console.log(props.users); 
      this.state = {name: '', repository: '', user: props.users[0]}
      
    }
  
    handleChange(event) 
    {    
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );  
    }

    handleSubmit(event) {
        //console.log(this.state.name)
        //console.log(this.state.repository)
       // console.log(this.state.user)
        this.props.createProject(this.state.name, this.state.repository, this.state.user)
        event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
              <label for="login">name</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} /> 
            </div>

            <div className="form-group">
              <label for="login">repository</label>
              <input type="text" className="form-control" name="repository" value={this.state.repository} onChange={(event)=>this.handleChange(event)} /> 
            </div>

            <div className="form-group">
              <label for="users">users</label>
              <select name="users" className='form-control' onChange={(event)=>this.handleChange(event)}>
                {this.props.users.map((item)=><option value={item.uuid}>{item.username}</option>)}
              </select> 
            </div>


            <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default ProjectForm
