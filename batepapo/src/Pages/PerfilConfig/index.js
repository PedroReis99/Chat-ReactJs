import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Firebase from '../../Services/Firebase';
import './style.css';

class PerfilConfig extends Component{

    constructor(props){
        super(props);
        this.state = {
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    async componentDidMount(){
        if(!Firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
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
            .ref(`images/${currentUid}/perfil/${imagem.name}`)
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

    registrar = async () =>{
        try {
            const { url, descricao } = this.state;

            await Firebase.InfosPerfil(url, descricao);
            this.props.history.replace('/dashboard/perfil')
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard/perfil">Voltar</Link>
                </header>
                <form onSubmit={this.registrar} id="new-post">
                    <span>{this.state.alert}</span>

                    <label>Imagem:</label><br />
                    <input type="file" onChange={this.handleFile} /> <br />
                    {this.state.url !== '' ?
                        <img src={this.state.url} alt="Capa do post" />
                        :
                        <progress value={this.state.progress} max="100" />
                    }
                    <label>Descrição:</label><br />
                    <textarea type="text" placeholder="Digite a descrição do post" value={this.state.descricao} 
                        onChange={(e) => this.setState({ descricao: e.target.value })} /> <br />

                    <button type="submit" >Salvar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(PerfilConfig);