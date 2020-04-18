//ARREGLAR ESTO

import React, { Component } from "react";
import Page from "../../Page";
import Input from "../../../Forms/Input/Input";
import Select from "../../../Forms/Select/Select";
import Form from "../../../Forms/Payment/Form";
import {
  emptyRegex,
  nameRegex,
  emailRegex
} from "../../../Forms/Validators/Validators";
import { saxios } from "../../../Utilities/Utilities";

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameError: null,
      email: "",
      emailError: null,
    };
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    saxios
      .get(`/api/seguridad/users/${this.props.auth.id}`)
      .then((data) => {
        //alert(JSON.stringify(data.data));
        this.setState({
          name: data.data.userCompleteName,
          email: data.data.userEmail,
        });
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  validate(state) {
    let nameErrors = false;
    let tmpErrors = [];
    const { name, email, password } = state;
    if (name !== undefined) {
      if (!nameRegex.test(name) || emptyRegex.test(name)) {
        tmpErrors.push("Ingrese un nombre en un formato válido");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { nameError: tmpErrors });
      }
    }
    if (email !== undefined) {
      tmpErrors = [];
      if (!emailRegex.test(email) || emptyRegex.test(email)) {
        tmpErrors.push("Ingrese un email numérica válida");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { emailError: tmpErrors });
      }
    }
    return nameErrors;
  }

  onChangeHandler(e) {
    const { name, value } = e.currentTarget;
    let errors = this.validate({ [name]: value });
    if (!errors) {
      errors = { [name + "Error"]: "" };
    }
    this.setState({
      ...this.state,
      [name]: value,
      ...errors,
    });
  }

  onClickUpdate(e) {
    e.preventDefault();
    e.stopPropagation();
    const errors = this.validate(this.state);
    if (errors) {
      this.setState({ ...this.state, ...errors });
    } else {
      const { name, email, password } = this.state;
      if (
        name === "Yes"
      ) {
        alert("No");
      } else {
        const uri = `/api/seguridad/users/upd/${this.props.auth.id}`;
        saxios
          .put(uri, {
            id: this.props.auth.id,
            usernames: this.state.name,
            email: this.state.email,
          })
          .then(({ data }) => {
            alert("Sus datos han sido actualizados exitosamente");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  render() {
    const action ="Actualizando Usuario";
    const formContent = [
      <Input
        name="name"
        caption="Nombre Completo"
        value={this.state.name}
        onChange={this.onChangeHandler}
        error={this.state.nameError}
        className="col-s-12"
      />,
      <Input
        name="email"
        caption="Email"
        value={this.state.email}
        onChange={this.onChangeHandler}
        error={this.state.emailError}
        className="col-s-12"
      />,
    ];
    return (
      <Page
        pageURL="Modificar Usuario"
        auth={this.props.auth}
      >
        <Form
          title={action}
          id="form-update-user"
          content={formContent}
          redirect="/"
          onClick={this.onClickUpdate}
        />
      </Page>
    );
  }
}