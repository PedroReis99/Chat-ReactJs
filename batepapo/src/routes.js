import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Firebase from './Services/Firebase';

import Carregando from './Componentes/Loading';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Cadastro from './Pages/Cadastro';
import Perfil from './Pages/Perfil';
import Chat from './Pages/Chat';
import PerfilConfig from './Pages/PerfilConfig';
import Error from './Pages/Error';

class Rotas extends Component{

    state = {
        firebaseInitialized: false,
    };

    componentDidMount(){
        Firebase.isInitialized().then(resultado => {
            //Muda o estado de conexão de false para true
            this.setState({ firebaseInitialized: true });
        });
    }

    render(){
        return this.state.firebaseInitialized !== false ? (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/cadastro" component={Cadastro} />
                    <Route exact path="/dashboard/perfil" component={Perfil} />
                    <Route exact path="/dashboard/chat" component={Chat} />
                    <Route exact path="/dashboard/perfil/InfosConfig" component={PerfilConfig} />
                    <Route path="*" component={Error} />
                </Switch>
            </BrowserRouter>
        ) : (
            <Carregando />
        );
    }
}

export default Rotas;