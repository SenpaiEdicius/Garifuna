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
        this.state = {
            open : false,
            display: false,
            userType : getLocalStorage('type')||'UKN',
            menu:[]
        }
    }

    componentDidMount(){
        const type = this.state.userType;
        paxios.post('/api/admin/access/makeMenu',{userType:type}).
        then((resp)=>{
            if(resp){
                this.setState({...this.state,menu:resp.data});
            }
        })
        .catch((err)=>{
            if(err){
                console.log(err);
            }
        })
    }

    logoutOnClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.auth.logout();
    }

    render(){
        const userMenu = [];
        if(this.state.menu.length >= 0){
            this.state.menu.map((menus)=>{
                userMenu.push(<li key={menus.pageURL}><Link to={menus.pageURL}>{menus.pageName}</Link></li>)
            })
        }
        const shown = this.state.open;
        console.log(shown);
        const displaying = this.state.display;
        if(this.props.auth && this.props.auth.isLogged && true){
            return(
                <header className="col-s-12">
                <div className="foto">

                </div>
                <div onClick={ ()=>{this.setState({open: !shown})}} className={displaying ? "hide":"burger"} id="hmb">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={displaying ? "close":"hidden"}>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Cursos</Link></li>
                    <li><Link to="/sobre">Sobre Nosotros</Link></li>
                    <li><Link to="/user">Mi Perfil</Link></li>
                    <li className="user-menu" onClick={ ()=>{this.setState({display: !displaying})}}></li>
                    <li><a onClick={this.logoutOnClick}>Cerrar Sesión</a></li>
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
                <div onClick={ ()=>{this.setState({open: !shown})}} className="burger" id="hmb">
                    <div></div>
                    <div></div>
                    <div></div>
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
