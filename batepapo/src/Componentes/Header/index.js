import React, { Component } from 'react';
import { Container, IconeSite } from './style';
import { Link } from 'react-router-dom';
import './style.css';

class Header extends Component{
    render(){
        return(
            <Container>
                <Link to="/"><IconeSite /></Link>
                <Link to="/login"><h3 id="entrar">Entrar</h3></Link>
            </Container>
        );
    }
}

export default Header;