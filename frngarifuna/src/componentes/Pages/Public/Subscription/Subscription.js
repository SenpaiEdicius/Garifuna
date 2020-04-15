//AGREGAR ENLACES AL REGISTER

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Page from "../../Page";
import './subscription.css';

export default class Subs extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Page pageURL="/subscriptions" auth={this.props.auth}>
  <h2 className="titulo">Suscripciones</h2>

        <div class="container54">
  <div class="card">
    <h3 class="title">Semanal</h3>
    <h2 class="pretitle">150 LPS</h2>
  <h2 class="reg">  <Link to="/register:1">Registrarse</Link> </h2>
    <div class="bar">
      <div class="emptybar"></div>
      <div class="filledbar"></div>
    </div>
    <div class="circle">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" >
      <circle class="stroke" cx="60" cy="60" r="50"/>
    </svg>
    </div>
  </div>
  <div class="card">
    <h3 class="title">Mensual</h3>
    <h2 class="pretitle">250 LPS</h2>
      <h2 class="reg">  <Link to="/register:1">Registrarse</Link> </h2>
    <div class="bar">
      <div class="emptybar"></div>
      <div class="filledbar"></div>
    </div>
    <div class="circle">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="stroke" cx="60" cy="60" r="50"/>
    </svg>
    </div>
  </div>
  <div class="card">
    <h3 class="title">Bimestral</h3>
    <h2 class="pretitle">350 LPS</h2>
      <h2 class="reg">  <Link to="/register:1">Registrarse</Link> </h2>
    <div class="bar">
      <div class="emptybar"></div>
      <div class="filledbar"></div>
    </div>
    <div class="circle">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="stroke" cx="60" cy="60" r="50"/>
    </svg>
    </div>
  </div>
  <div class="card">
    <h3 class="title">Anual</h3>
    <h2 class="pretitle">550 LPS</h2>
      <h2 class="reg">  <Link to="/register:1">Registrarse</Link> </h2>
    <div class="bar">
      <div class="emptybar"></div>
      <div class="filledbar"></div>
    </div>
    <div class="circle">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="stroke" cx="60" cy="60" r="50"/>
    </svg>
    </div>
  </div>
</div>
      </Page>
    );
  }
}
