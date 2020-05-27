import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Campo, IconeEnviar } from './style';
import Firebase from '../../Services/Firebase';
import './style.css';
import Title from '../../Componentes/Title';

class Chat extends Component{

    constructor(props){
        super(props);
        this.state = {
            mensagem: '',
            posts: []
        };
        this.RecebeMensagem= this.RecebeMensagem.bind(this);
        this.Mensagem = this.Mensagem.bind(this);
    }

    componentDidMount(){
        Firebase.app.ref('mensagens').on('value', (snapshot) => {
          let state = this.state;
          state.posts = [];
          snapshot.forEach((childItem) => {
            state.posts.push({
              mensagem: childItem.val().mensagem,
              usuario: childItem.val().usuario
            });
          });
          this.setState(state);
        });
      }

    RecebeMensagem= async () => {
        try {
            //const uid = Firebase.getCurrentUid();
            //const idChat = uid + localStorage.id;
            const { mensagem } = this.state;

            let post = Firebase.app.ref('mensagens')
            let chave = post.push().key;
    
                await post.child(chave).set({
                    usuarioID: localStorage.id,
                    usuario: localStorage.nome,
                    mensagem: mensagem
                });
                this.setState({ mensagem: '' });
        } catch (error) {
            console.log(error);
        }
    }

    Mensagem(e){
        e.preventDefault();
        this.RecebeMensagem();
    }

    render(){
        return(
            <div id="Conteudo">
                <Title />
                <Container>
                    <section id="Post">
                        {this.state.posts.map( (post) => {
                            return(
                                <article>{post.key}
                                    <header>
                                        <span>{post.usuario}:</span>
                                    </header>
                                    <p>{post.mensagem}</p>
                                    <hr />
                                </article>
                            );
                        })}
                    </section>
                </Container>
                <Campo>
                    <form onSubmit={this.Mensagem} id="Mensagem" >
                    <input type="text" value={this.state.mensagem} autoFocus autoComplete="off"
                        onChange={ (e)=>this.setState({mensagem: e.target.value}) }/><br />
                    <button type="submit"><IconeEnviar /></button>
                    </form>
                </Campo>
            </div>
        );
    }
}

export default withRouter(Chat);