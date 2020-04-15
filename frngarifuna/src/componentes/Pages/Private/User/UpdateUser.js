//ARREGLAR ESTO

import React, { Component } from "react";
import Page from "../../Page";
import Input from "../../../Forms/Input/Input";
import Select from "../../../Forms/Select/Select";
import Form from "../../../Forms/Payment/Form";
import {
  emptyRegex,
  nameRegex,
  edadRegex,
} from "../../../Forms/Validators/Validators";
import { saxios } from "../../../Utilities/Utilities";

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameError: null,
      edad: "",
      edadError: null,
      genero: "Masculino",
    };
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.changeCMB = this.changeCMB.bind(this);
  }
  componentDidMount() {
    saxios
      .get(`/api/user/${this.props.auth.id}`)
      .then((data) => {
        //alert(JSON.stringify(data.data));
        this.setState({
          name: data.data.userCompleteName,
          edad: data.data.userAge,
          genero: data.data.userGender,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validate(state) {
    let nameErrors = false;
    let tmpErrors = [];
    const { name, edad, password } = state;
    if (name !== undefined) {
      if (!nameRegex.test(name) || emptyRegex.test(name)) {
        tmpErrors.push("Ingrese un nombre en un formato válido");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { nameError: tmpErrors });
      }
    }
    if (edad !== undefined) {
      tmpErrors = [];
      if (!edadRegex.test(edad) || emptyRegex.test(edad)) {
        tmpErrors.push("Ingrese una edad numérica válida");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { edadError: tmpErrors });
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
      const { name, edad, password, genero } = this.state;
      if (
        name === "Daphnes Nohansen Hyrule" ||
        name === "Rhoam Bosphoramus Hyrule"
      ) {
        alert("No se crea rey cuando no lo es, pero respeto sus conocimientos");
      } else if (parseInt(edad) < 10 || parseInt(edad) > 120) {
        alert("Ingrese una edad creíble");
      } else {
        const uri = `api/user/upd/${this.props.auth.id}`;
        saxios
          .put(uri, {
            id: this.props.auth.id,
            usernames: this.state.name,
            edad: this.state.edad,
            usergender: this.state.genero,
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

  changeCMB(e) {
    this.setState({ genero: e.target.value });
  }

  render() {
    const action ="Actualizando Usuario";
    const selectItems = [
      { value: "Masculino", dsc: "Masculino" },
      { value: "Femenino", dsc: "Femenino" },
      { value: "Otros", dsc: "Otros" },
    ];
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
        name="edad"
        caption="Edad"
        value={this.state.edad}
        onChange={this.onChangeHandler}
        error={this.state.edadError}
        className="col-s-12"
      />,
      <Select
        name="genero"
        id="genero"
        item={selectItems}
        caption="Genero"
        onChange={this.changeCMB}
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