import React, { Component } from 'react';
import Firebase from '../../Services/Firebase';
import './style.css';

class Post extends Component{

    state = {
    posts: []
  };

  componentDidMount(){
    Firebase.app.ref('posts').on('value', (snapshot) => {
      let state = this.state;
      state.posts = [];
      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          imagem: childItem.val().imagem,
          descricao: childItem.val().descricao,
          autor: childItem.val().autor
        });
      });
      state.posts.reverse();
      this.setState(state);
    });
  }

    render(){
        return(
            <div>
                <section id="post">
                    {this.state.posts.map( (post) => {
                    return(
                        <article key={post.key}>
                        <header>
                            <div className="title">
                            <strong>{post.titulo}</strong>
                            <span>Autor: {post.autor}</span>
                            </div>
                        </header>
                        { post.imagem !== '' ?
                            <img src={post.imagem} alt="" />
                              :
                            <h1> </h1>
                            //H1 vazio para não aparecer nada no post caso o usuario não tenha postado uma imagem
                        }
                        <footer>
                            <p>{post.descricao}</p>
                        </footer>   
                        </article>
                    );
                    })}
                </section>
            </div>
        );
    }
}

export default Post;