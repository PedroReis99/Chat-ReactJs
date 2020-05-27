import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBV7ExJVXkxGzeoe48iY2Bq4hcIOdzHwmw",
    authDomain: "batepapo-86062.firebaseapp.com",
    databaseURL: "https://batepapo-86062.firebaseio.com",
    projectId: "batepapo-86062",
    storageBucket: "batepapo-86062.appspot.com",
    messagingSenderId: "183926970540",
    appId: "1:183926970540:web:5c99a7e4a6e048d4a46709",
    measurementId: "G-ETZJ72L85E"
  };

class Firebase{
    constructor(props){
        app.initializeApp(firebaseConfig);

        this.app = app.database();
        this.storage = app.storage();
    }


    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, idade, email, senha, Estado, Foto){
        await app.auth().createUserWithEmailAndPassword(email, senha);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome,
            idade: idade,
            estado: Estado,
            id: uid,
            Foto: Foto
        });
    }

    GaleriaRegister( urlImagem ){
        const uid = app.auth().currentUser.uid;

        return app.database().ref('Galeria').child(uid).child(uid).set({
            idUser: uid,
            urlImagem: urlImagem
        });
    }

    Mensagem(mesagem, participantes){
        //const uid = app.auth().currentUser.uid;

        return app.database().ref('mensagens').key.set({
            mensagem: mesagem,
        });
    }

    InfosPerfil(imagemUrl, descricao){
        const uid = app.auth().currentUser.uid;

        return app.database().ref('InfosPerfil').child(uid).set({
            imagemURL: imagemUrl,
            descricao: descricao,
        });
    }
    
    //Método que passa o estado de conexão com a firebase(obs: o estado é true ou false)
    isInitialized(){
        return new Promise( resolve => {
            app.auth().onAuthStateChanged(resolve);
        });
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUserName(callBack){
        if(!app.auth().currentUser){
            return  null;
        }

        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid)
            .once('value').then(callBack);
    }
}

export default new Firebase();