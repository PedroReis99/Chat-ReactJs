import React, { Component } from 'react';
import Firebase from '../../Services/Firebase'
import { withRouter } from 'react-router-dom';
import { Container } from './styles';
import Title from '../../Componentes/Title';
import './style.css';

class Perfil extends Component{

    state = {
        conteudo: [],
        Infos: []
    };

    componentDidMount(){
        const uid = Firebase.getCurrentUid();

        Firebase.app.ref(`usuarios`).child(uid).on('value', (snapshot) => {
          let state = this.state;
          state.conteudo = [];
          snapshot.forEach((childItem) => {
            state.conteudo.push({
              key: childItem.key,
              nome: childItem.val().nome,
              idade: childItem.val().idade,
              foto: childItem.val().Foto
            });
          });
          this.setState(state);
        });
      }

    render(){
        return(
            <div>
                <Title />
                <Container>
                    <section id="post">
                        {this.state.conteudo.map( (cont) => {
                        return(
                            <article key={cont.key}>
                                <header>
                                    <div id="ImagemPerfi">
                                        <img src={cont.foto} alt="Capa do post" />
                                    </div>
                                    <div className="title">
                                        <strong>{cont.nome}</strong>
                                        <span>Idade: {cont.idade} anos</span>
                                    </div>
                                </header> 
                            </article>
                        );
                        })}
                    </section>
                </Container>
            </div>
        );
    }
}

export default withRouter(Perfil);