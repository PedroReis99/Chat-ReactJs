import React, { Component } from 'react';
import { Container, Informacao, Icone1, Header, IconeSite } from './style';
import { Link, withRouter} from 'react-router-dom';
import Firebase from '../../Services/Firebase';
//import Header from '../../Componentes/Header';
import './style.css';

class Home extends Component{

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
                <Header>
                    <Link to="/"><IconeSite /></Link>
                    <div>
                    <form onSubmit={this.entrar} id="log">
                        <label>Email:</label>
                        <input type="email" autoComplete="off" autoFocus value={this.state.email}
                            onChange={ (e)=> this.setState({ email: e.target.value})} placeholder="email@email.com" />
                        <label>Senha:</label>
                        <input type="password" autoComplete="off" value={this.state.password}
                            onChange={ (e)=> this.setState({ password: e.target.value})} placeholder="12323" />
                        <button type="submit">Entrar</button>
                    </form>
                    </div>
                </Header>
                <Container>
                    <Informacao>
                        <h1>Seja Bem Vindo a Rocket Chat</h1>
                        <Icone1 />
                        <span>Neste site você vai poder conversar com pessoas do mundo inteiro!</span> <br />
                        <Link to="/cadastro">cadastre-se aqui</Link>
                    </Informacao>
                </Container>
            </div>
        );
    }
}

export default withRouter(Home);