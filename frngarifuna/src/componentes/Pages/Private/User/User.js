//ARREGLAR ESTO

import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from 'react-router-dom';
import Page from '../../Page';
import { paxios, saxios } from '../../../Utilities/Utilities.js';

import Input from "../../../Forms/Input/Input";
import Select from "../../../Forms/Select/Select";

export default class User extends Component {
  constructor(){
    super();
    this.state={
     items:[],
     hasMore:true,
     page:1,
     itemsToLoad:5
    }
    this.loadMore = this.loadMore.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
 }

 onClickHandler(e){
  const CourseID = e.target.href.substring(37,e.target.href.length)
  const uri = `/api/user/courses/add`;
  saxios.post(uri,{
    userID: this.props.auth.id,
    courseID: CourseID
  })
  .then(
    ({data})=>{
    }
  )
  .catch(
    (err)=>{
      console.log(err);
    }
  )
}

 loadMore(page){
    const items  = this.state.itemsToLoad;
    const uri = `/api/seguridad/${page}/${items}`;
    paxios.get(uri)
      .then(
        ({data})=>{
          //console.log(data);
          const { courses:apiItems, total} = data;
          const loadedItems = this.state.items;
          apiItems.map((e)=>loadedItems.push(e));
          if(total){
              this.setState({
                'items': loadedItems,
                'hasMore': (page * items < total)
               });
           } else {
             this.setState({
               'hasMore': false
             });
           }
         }
       )
       .catch(
         (err)=>{
           console.log(err);
         }
       );
   }

   render() {
    let link = "/subscription";
    let dsc ="";
    if(this.props.auth.isLogged){
      link="/course/classes/";
      dsc="Iniciar"
    }
    if(this.props.auth.isLogged===true && this.props.auth.type==="ADM"){
      link="/courses/updateCourse/";
      dsc="Modificar"
    }
    const uiItems = this.state.items.map(
      (item)=>{
        //console.log(item.courseName);
        return (
          <div className='listItem col-s-5 col-m-3 col-2' key={item._id}>
            <h1 className="main-color">{item.courseName} </h1>
            <br />
            <div className="line"></div>
            <br />
            <p>{item.courseDesc}</p>
            <br />
            <div className="line"></div>
            <br />
            {(this.props.auth.isLogged)? <Link className="button-3" to={link+item._id}>{dsc}</Link>:
            <Link className="button-3 center" to="/updateuser">Cambiar Perfil</Link> }
     
           
          </div>);
      }
    );
  
    if (!uiItems.length) uiItems.push(
      <div className="listItem" key="pbListAddOne">
        <span>No hay nada aquí</span>
      </div>);
  
    return (
      <Page pageURL="/user " auth={this.props.auth}>
        <div className="usuario-actualizar">
            <Link className="button-3 center" to="/updateuser">Cambiar Perfil</Link>
        </div>   
      </Page>
     );
    }
  }