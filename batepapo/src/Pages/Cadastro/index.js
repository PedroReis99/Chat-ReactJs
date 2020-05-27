import React, { Component } from 'react';
import Firebase from '../../Services/Firebase';
import { Link ,withRouter } from 'react-router-dom';
import './style.css';

class Cadastro extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome: '',
            idade: '',
            email: '',
            password: '',
            estado: '',
            //Adicionar imagem no perfil
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        };
        this.cadastrar = this.cadastrar.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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

    cadastrar(e){
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async () => {
        try {
            const { nome , idade, email, password, estado, url } = this.state;

            await Firebase.register(nome, idade, email, password, estado, url);
            await Firebase.GaleriaRegister(url);
            this.props.history.replace('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }

    render(){
        return(
            <div>
                <Link to="/" ><button id="Voltar">Voltar</button></Link>
                <h1 className="register-h1">Novo usuario</h1>
                <form onSubmit={this.cadastrar} id="register" >
                    <label>Nome:</label><br />
                    <input type="text" value={this.state.nome} autoFocus autoComplete="off" placeholder="Digite seu nome"
                        onChange={ (e)=>this.setState({nome: e.target.value}) }/><br />
                    <label>Idade:</label><br />
                    <input type="text" value={this.state.idade} autoComplete="off" placeholder="Digite sua idade"
                        onChange={(e) => this.setState({ idade: e.target.value })} /><br />
                    <label>Estado(UF):</label><br />
                    <input type="text" value={this.state.estado} autoComplete="off" placeholder="Digite seu nome"
                        onChange={ (e)=>this.setState({estado: e.target.value}) }/><br />
                    <label>Email:</label><br />
                    <input type="Email" value={this.state.email} autoComplete="off" placeholder="email@email.com"
                        onChange={(e) => this.setState({ email: e.target.value })} /><br />
                    <label>Senha:</label><br />
                    <input type="password" value={this.state.password} autoComplete="off" placeholder="Digite sua senha"
                        onChange={(e) => this.setState({ password: e.target.value })} /><br />
                    <div id="Imagem">
                                    <label>Imagem:</label><br />
                                    <input type="file" onChange={this.handleFile}/> <br />
                                        {this.state.url !== '' ?
                                            <img src={this.state.url} alt="Capa do post" />
                                            :
                                            <progress value={this.state.progress} max="100" />
                                        }
                                </div>
                    <button type="submit">Cadastrar-se</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Cadastro);