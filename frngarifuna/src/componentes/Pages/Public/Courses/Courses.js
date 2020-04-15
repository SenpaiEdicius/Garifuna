//VER QUE FUNCIONE

import './courses.css';
import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from 'react-router-dom';
import Page from '../../Page';
import { paxios, saxios } from '../../../Utilities/Utilities.js';

export default class Courses extends Component {
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
    const uri = `/api/public/courses/${page}/${items}`;
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
            <h2>Tiempo de Completación <br/> {item.courseHours} H</h2>
            <p>{item.courseDesc}</p>
            <br />
            <div className="line"></div>
            <br />
            {(this.props.auth.isLogged)? <Link className="button-3" to={link+item._id}>{dsc}</Link>:
            <Link className="button-3" to={link}>Registrar</Link> }


          </div>);
      }
    );

    if (!uiItems.length) uiItems.push(
      <div className="listItem" key="pbListAddOne">
        <span></span>
      </div>);

    return (
      <Page pageURL="/courses " auth={this.props.auth}>

  <h2 className="col-s-12-3">Cursos</h2>

  <div class="container78">
        <div class="collapse-content">
  <div class="collapse" id="instagram">
    <a class="instagram" href="#instagram"
      ><i class="fab fa-instagram"></i> Curso Garifuna Nivel Principiante</a
    >
    <div class="content">
      <div class="inner-content">
        <h3>Introducción Fonología</h3>
        Nivel basico de Garifuna, el estudiante aprendera el vocabulario, formacion,pronunciacion de palabras y escritura basica.
      </div>
    </div>
  </div>
  <div class="collapse" id="twitter">
    <a class="twitter" href="#twitter"
      ><i class="fab fa-twitter"></i> Curso de Procesos Morfológicos</a
    >
    <div class="content">
      <div class="inner-content">
        <h3>Dimensión Nominal & Verbal</h3>
        El alumno aprendera los géneros,
            posesion,
            número,
            neterminantes,
            demostrativos y definidad,
            cuantificadores,
            posesivos,
            pronombres
      </div>
    </div>
  </div>
  <div class="collapse" id="dribbble">
    <a class="dribbble" href="#dribbble"
      ><i class="fab fa-dribbble"></i> Curso Garifuna Nivel Intermedio</a
    >
    <div class="content">
      <div class="inner-content">
        <h3>Dimensión verbal</h3>
Nivel Intermedio de Garifuna, el estudiante aprendera formulacion de palabras, conjugacion de oraciones por tiempo, formas auxiliares,Categorias verbales, Adjetivos, Conjunciones.
      </div>
    </div>
  </div>
  <div class="collapse" id="youtube">
    <a class="youtube" href="#youtube"
      ><i class="fab fa-youtube"></i> Curso Garifuna Nivel Avanzado</a
    >
    <div class="content">
      <div class="inner-content">
        <h3>Oraciones y Compuestas</h3>
      Nivel Avanzado de Garifuna, el estudiante podra comprender en un 80%-100% el leguaje garifuna, aprendera a conjugar con los tiempos,oraciones compuestas,comprension, lectura y escritura.
      </div>
    </div>
  </div>
</div>
</div>
      </Page>
     );
    }
  }
