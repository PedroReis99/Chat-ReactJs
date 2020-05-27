import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import Firebase from '../../Services/Firebase';
import './style.css';

export default class AddFoto extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible : false,
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
            const currentUid = Firebase.getCurrentUid();
            let post = Firebase.app.ref('PerfilUsers')
            let chave = post.push().key;

            await post.child(chave).set({
                imagem: this.state.url,
            });

            this.props.history.push('/dashboard');
            this.setState({ imagem: null, descricao: ''});
        } else{
            this.setState({ alert: 'Preencha todos os campos!' });
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <section>
                <input type="button" value="Adicionar foto" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" 
                    onClickAway={() => this.closeModal()}>
                    <div>
                        <form id="new-post">
                            <input type="file" onChange={this.handleFile} /> <br />
                                {this.state.url !== '' ?
                                    <img src={this.state.url} alt="Capa do post" />
                                        :
                                    <progress value={this.state.progress} max="100" />
                                }
                            <button type="submit" >Salvar</button>
                        </form>
                        <button onClick={() => this.closeModal()} >Fechar </button>
                    </div>
                </Modal>
            </section>
        );
    }
}