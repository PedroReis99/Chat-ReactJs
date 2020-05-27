import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import Firebase from '../../Services/Firebase';
import './login.css';


class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        //Verifica se tem algum usuario logado
        if(Firebase.getCurrent()){
            return this.props.history.replace('/dashboard'); 
        }
    }

    entrar(e){
        e.preventDefault();
        this.login();
    }

    login = async () => {
        const { email, password } = this.state;

        try {
            await Firebase.login(email, password)
            .catch((error) => {
                if(error.code === 'auth/user-not-found'){
                    alert('Este usuario não existe!')
                }else{
                    alert('Código de erro: ' +error.code);
                    return null;
                }
            });
            this.props.history.replace("/dashboard"); 
        } catch (error) {
            alert(error.message);
        }
    }

    render(){
        return(
            <div>
                <Link to="/" ><button id="Voltar">Voltar</button></Link>
                <form onSubmit={this.entrar} id="login" >
                    <label>Email</label> <br />
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}
                        onChange={ (e)=> this.setState({ email: e.target.value})} placeholder="email@email.com" />
                        <br />
                    <label>Senha</label> <br />
                    <input type="password" autoComplete="off" value={this.state.password}
                        onChange={ (e)=> this.setState({ password: e.target.value})} placeholder="12323" />
                        <br /><br />

                    <button type="submit">Entrar</button>
                    <Link to="/cadastro">Ainda não possui uma conta?</Link>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);