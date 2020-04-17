import './Header.css';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import img from './ejemplo.png';
import {getLocalStorage} from '../Utilities/Utilities';
import {saxios,paxios} from '../Utilities/Utilities';

export default class Header extends Component{

    constructor(){
        super();
        this.logoutOnClick = this.logoutOnClick.bind(this);
    }

    logoutOnClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.auth.logout();
    }

    render(){    
        if(this.props.auth && this.props.auth.isLogged && true){
            return(
                <header className="col-s-12">
                <div className="foto">
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Cursos</Link></li>
                    <li><Link to="/subscription">Subscripciones</Link></li>
                    <li><Link to="/sobre">Sobre Nosotros</Link></li>
                    <li><a onClick={this.logoutOnClick}><Link>Cerrar Sesión</Link></a></li>
                </ul>
            </header>
            );
        }
        else{
            return(
            <header className="col-s-12">
                <div className="title col-s-7 col-m-5 col-12 no-margin no-padding">
                <Link to="/"><img src={img} alt="Katabu" width="200"/></Link>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Cursos</Link></li>
                    <li><Link to="/subscription">Subscripciones</Link></li>
                    <li><Link to="/sobre">Sobre Nosotros</Link></li>
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                </ul>
            </header>
            );
        }
    }
}
