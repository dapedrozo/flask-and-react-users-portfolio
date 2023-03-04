import React, { Component } from 'react'
const API =process.env.REACT_APP_API;

export default class Users extends Component {

    state= {
        users: [],
        name: '',
        email:'',
        pass:'',
        editando:false,
        id:''
    }

    HandleSubmit = async (e) =>{
        e.preventDefault()
        if (!this.state.editando){
            const res = await fetch(`${API}/users`,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.pass,
                })
            })
            const data = await res.json();
            console.log(data)
        } else{
            const res = await fetch(`${API}/users/${this.state.id}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.pass,
            })
        })
        const data = await res.json()
        console.log(data)
        this.setState({
            editando:false,
            id:''
        })
        }
        this.setState({
            name: '',
            email: '',
            pass: ''
        });
        await this.getUsers();
    }

    getUsers = async () =>{
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        this.setState({
            users:data
        })
    }

    deleteUser = async (id) =>{
        const userResponse = window.confirm('estas seguro de eliminar el usuario?')
        if(userResponse){
            const res = await fetch(`${API}/users/${id}`,{
                method: 'DELETE'
            })
            await res.json()
            await this.getUsers();
        }
    }

    editeUser = async (id) =>{
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json()
        this.setState({
            editando:true
        })
        this.setState({
            name: data.name,
            email: data.email,
            pass:data.password,
            id: data._id
        })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount(){
        this.getUsers();
    }

    render() {
        return (
            <div>
               <div className="row">
                   <div className="col-md-4">
                       <form onSubmit={this.HandleSubmit} className="card card-body">
                            <div className="form-group">
                                <input 
                                className="form-control"
                                placeholder="insert name"
                                autoFocus
                                type="text" 
                                name="name" 
                                onChange={this.onInputChange} 
                                value={this.state.name}/>
                            </div>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                placeholder="insert email"
                                type="email" 
                                name="email" 
                                onChange={this.onInputChange} 
                                value={this.state.email}/>
                            </div>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                placeholder="insert pass"
                                type="password" 
                                name="pass" 
                                onChange={this.onInputChange} 
                                value={this.state.pass}/>
                            </div>
                            <button className="btn btn-primary btn-block">
                                {this.state.editando ? 'Actualizar':'Crear'}
                            </button>
                       </form>
                   </div>
                   <div className="col-md-8">
                       <table className='table table-dark table-striped'>
                           <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>pass</th>
                                    <th>operaciones</th>
                                </tr>
                           </thead>
                           <tbody>
                           
                           {this.state.users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                <button 
                                className='btn btn-secondary btn-block'
                                onClick={()=>this.editeUser(user._id)}>
                                    editar
                                    </button>
                                <button 
                                className='btn btn-danger btn-block'
                                onClick={()=>this.deleteUser(user._id)}>
                                    eliminar
                                </button>
                                </td>
                            </tr>
                            ))}
                           </tbody>
                       </table>
                   </div>
               </div>
            </div>
        )
    }
}
