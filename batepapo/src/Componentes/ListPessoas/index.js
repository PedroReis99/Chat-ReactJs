import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import styled from 'styled-components';
import Firebase from '../../Services/Firebase';

class ListaPessoas extends Component{

    state = {
        conteudo: [],
        Infos: [],
    };

    componentDidMount(){
        //const uid = Firebase.getCurrentUid();

        Firebase.app.ref(`usuarios`).on('value', (snapshot) => {
          let state = this.state;
          state.conteudo = [];
          snapshot.forEach((childItem) => {
            state.conteudo.push({
              key: childItem.key,
              nome: childItem.val().nome,
              idade: childItem.val().idade,
              foto: childItem.val().Foto,
            });
          });
          this.setState(state);
        });
      }

    IconPerfil = styled(MdPerson)`
        width: 50px;
        height: 50px;
        border-radius: 50px;
        border: none;
        color: #000000;
        background-color: #DDDDDD;
        margin-right: 10px;
        margin-left: 15px;
    `;

    render(){
        return(
            <div id="Container">
                <Link to="/dashboard/chat">
                    <section id="post">
                        {this.state.conteudo.map( (cont) => {
                            return(
                                <article key={cont.key}>
                                    <header>
                                        <div id="ImagemPerfi">
                                            { cont.foto !== '' ?
                                                <img src={cont.foto} alt="Capa do post" />
                                                    :
                                                <this.IconPerfil />
                                            }
                                        </div>
                                        <div className="title">
                                            <h1>{localStorage.idChat}</h1>
                                            <strong>{cont.nome}</strong>
                                        </div>
                                    </header> 
                                </article>
                            );
                        })}
                    </section>
                </Link>
            </div>
        );
    }
}

export default ListaPessoas;