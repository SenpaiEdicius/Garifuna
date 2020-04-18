//ARREGLAR ESTO

import React, { Component } from "react";
import Page from "../../Page";
import CreditCardInput from 'react-credit-card-input';
import Input from "../../../Forms/Input/Input";
import Form from "../../../Forms/Payment/Form";
import Select from "../../../Forms/Select/Select";
import { Link, Redirect } from "react-router-dom";
import {
  emptyRegex,
  nameRegex,
} from "../../../Forms/Validators/Validators";
import { saxios, paxios, setLocalStorage } from "../../../Utilities/Utilities";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameError: null,
    };
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.changeCMB = this.changeCMB.bind(this);
    this.changeCMC = this.changeCMC.bind(this);
  }

  componentDidMount() {
    saxios
      .get(`/api/seguridad/users/${this.props.auth.id}`)
      .then((data) => {
        //alert(JSON.stringify(data.data));
        this.setState({
          name: data.data.userCompleteName,
          course: data.data.userCourse,
          sub: data.data.userSubscription,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validate(state) {
    let nameErrors = false;
    let tmpErrors = [];
    const { name } = state;
    if (name !== undefined) {
      if (!nameRegex.test(name) || emptyRegex.test(name)) {
        tmpErrors.push("Ingrese un nombre en un formato válido");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { nameError: tmpErrors });
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
      const { name, course, sub, password } = this.state;
      if (
        name === "Yes"
      ) {
        alert("No");
      } else {
        const uri = `/api/seguridad/users/payment/${this.props.auth.id}`;
        saxios
          .put(uri, {
            id: this.props.auth.id,
            usernames: this.state.name,
            course: this.state.course,
            sub: this.state.sub,
          })
          .then(({ data }) => {
            console.log(data);
            alert("El pago ha sido efectuado exitosamente");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  changeCMB(e) {
    this.setState({ course: e.target.value });
  }

  changeCMC(e) {
    this.setState({ sub: e.target.value });
  }

  render() {
    const action ="Efectuando Pago";
    const selectItems = [
      { value: "N/A", dsc: "N/A" },
      { value: "Curso Garifuna Nivel Principiante", dsc: "Curso Garifuna Nivel Principiante" },
      { value: "Curso de Procesos Morfológicos", dsc: "Curso de Procesos Morfológicos" },
      { value: "Curso Garífuna Nivel Intermedio", dsc: "Curso Garífuna Nivel Intermedio" },
      { value: "Curso Garífuna Nivel Avanzado", dsc: "Curso Garífuna Nivel Avanzado" },
    ];
    const selectItemsS = [
      { value: "N/A", dsc: "N/A" },
      { value: "Semanal", dsc: "Semanal" },
      { value: "Mensual", dsc: "Mensual" },
      { value: "Bimestral", dsc: "Bimestral" },
      { value: "Anual", dsc: "Anual" },
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
      <Select
        name="course"
        id="course"
        item={selectItems}
        caption="Course"
        onChange={this.changeCMB}
      />,
      <Select
        name="subs"
        id="subs"
        item={selectItemsS}
        caption="Subscripción"
        onChange={this.changeCMC}
      />,
      <CreditCardInput
        fieldClassName="input"
      />
    ];
    if (this.props.auth && this.props.auth.isLogged && true){
      return (
        <Page pageTitle="Registro" auth={this.props.auth}>
        <Form
            title={action}
            id="form-payment-user"
            content={formContent}
            redirect="/"
            onClick={this.onClickUpdate}
          />
      </Page>
      );
    } else {
      return(
        <Page>
        <div onClick={this.props.history.push('/login')}> login </div>
        </Page>
      );
    }

  }
}
