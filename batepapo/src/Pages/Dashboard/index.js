import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Title from '../../Componentes/Title';
import Post from '../../Componentes/Posts';
import ListaPessoas from '../../Componentes/ListPessoas';
import { Container } from './style';
import Firebase from '../../Services/Firebase';
import './style.css';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        }
        this.cadastrarPost = this.cadastrarPost.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    async componentDidMount(){
        if(!Firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        Firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            this.setState({ nome: localStorage.nome });
            localStorage.id = info.val().id;
            this.setState({ id: localStorage.id });
        });
    }

    handleFile = async (e) =>{
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({ imagem: image});
                this.handleUpload();
            }else{
                alert('Envien imagens do tipo png ou jpg');
                this.setState({imagem: null});
                return null;
            }
            
        }
    }

    handleUpload = async () => {
        const { imagem } = this.state;
        const currentUid = Firebase.getCurrentUid();

        const uploadTaks = Firebase.storage
            .ref(`images/${currentUid}/${imagem.name}`)
                .put(imagem);

        await uploadTaks.on('state_changed', (snapshot) => {
            //progresso
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
        }, (error) => {
            //Erro
            console.log(imagem + error);
        }, () => {
            //Sucesso!
            Firebase.storage.ref(`images/${currentUid}`)
                .child(imagem.name).getDownloadURL()
                    .then( url => {
                        this.setState({ url: url });
                    });
        });
    }

    cadastrarPost = async () => {

        if(this.state.descricao !== ''){
            let post = Firebase.app.ref('posts')
            let chave = post.push().key;

            await post.child(chave).set({
                imagem: this.state.url,
                descricao: this.state.descricao,
                autor: localStorage.nome
            });

            this.props.history.push('/dashboard');
            this.setState({ imagem: null, descricao: ''});
        } else{
            this.setState({ alert: 'Preencha todos os campos!' });
        }
    }

    render(){
        return(
            <div>
                <Title />
                <div id="Content">
                    <div id="Pessoas">
                        <h1>Conversar com:</h1>
                        <ListaPessoas />
                    </div>
                    <Container>
                        <div id="NovoPost">
                            <form onSubmit={this.cadastrarPost} id="new-post">
                                <span>{this.state.alert}</span>

                                <div id="Imagem">
                                    <label>Imagem:</label><br />
                                    <input type="file" onChange={this.handleFile} /> <br />
                                        {this.state.url !== '' ?
                                            <img src={this.state.url} alt="Capa do post" />
                                            :
                                            <progress value={this.state.progress} max="100" />
                                        }
                                </div>
                                <label>Descrição:</label><br />
                                <textarea type="text" placeholder="Digite a descrição do post" value={this.state.descricao} 
                                    onChange={(e) => this.setState({ descricao: e.target.value })} /> <br />

                                <button type="submit" >Postar   </button>
                            </form>
                        </div>
                        <Post />
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);