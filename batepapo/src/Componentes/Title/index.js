import React, { Component } from 'react';
import { Container, Icone, DashPost, IconePerfil} from './style';
import { Link } from 'react-router-dom';
import Firebase from '../../Services/Firebase';
import './style.css';

class Title extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome,
            id: localStorage.id,
        };
        this.Logout = this.Logout.bind(this);
    }

    Logout = async () => {
        await Firebase.logout()
            .catch((error) => {
                console.log(error);
            });
        localStorage.removeItem("nome", "id");
        //this.props.history.push('/');
      }

    render(){
        return(
            <Container>
                <Link to="/dashboard/perfil"><IconePerfil /></Link>
                <Link to="/dashboard"><button id="Posts"><DashPost /></button></Link>
                <Link to="/"><button id="Sair" onClick={ () => this.Logout() } >Logout<Icone /></button></Link>
            </Container>
        );
    }
}

export default Title;