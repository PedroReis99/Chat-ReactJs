import React, { Component } from 'react';
import { Container, Content ,Icone } from './Style.js';
import './style.css';

class Error extends Component{
    render(){
        return(
            <Container>
                    <Content>
                        <Icone />
                        <div id="Text">
                            <h2>Erro 404</h2><br />
                            <h4>página não encontrada</h4>
                        </div>
                    </Content>
            </Container>
        );
    }
}

export default Error;