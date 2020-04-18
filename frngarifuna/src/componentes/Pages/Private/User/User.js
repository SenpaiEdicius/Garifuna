import React, { Component } from "react";
import Page from "../../Page";
import { Link, Redirect } from "react-router-dom";
import { saxios, paxios, setLocalStorage } from "../../../Utilities/Utilities";

export default class User extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount()
  {
    const id = this.props.match.params.id;
    saxios.get(
      `/api/seguridad/users/${this.props.auth.id}`
    )
    .then((data)=>{
      console.log(data);
      this.setState(data.data);
    })
    .catch((e)=>{ 
      console.log(e);
    })
  }

  render() {
    const id = this.props.match.params.id;
    var {userCompleteName, userEmail, userCourse} = this.state;
    return (
      <Page pageTitle="User" auth={this.props.auth}>
          <h1>{userCompleteName}</h1>
          <h3>{userEmail}</h3>
          <h3>Curso Actual: {userCourse}</h3>
      <Link to={`/updateuser/${this.props.auth.id}`}>Cambiar Perfil</Link>
    </Page>
    );
  }
}