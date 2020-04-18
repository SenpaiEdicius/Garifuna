//ARREGLAR ESTO

import React, { Component } from "react";
import Page from "../../Page";
import Input from "../../../Forms/Input/Input";
import Form from "../../../Forms/Payment/Form";
import Select from "../../../Forms/Select/Select";
import { Link, Redirect } from "react-router-dom";
import {
  emptyRegex,
  nameRegex,
  emailRegex,
  creditRegex,
} from "../../../Forms/Validators/Validators";
import { saxios, paxios, setLocalStorage } from "../../../Utilities/Utilities";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameError: null,
      email: "",
      emailError: null,
      card: "",
      cardError: null,
    };
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(state) {
    let nameErrors = false;
    let tmpErrors = [];
    const { name, email, card } = state;
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
    if (card!== undefined) {
      tmpErrors = [];
      if (!creditRegex.test(card) || emptyRegex.test(card)) {
        tmpErrors.push("Ingrese un número de tarjeta de crédito válida");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { cardError: tmpErrors });
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
      const { name, course, sub, card, password } = this.state;
      if (
        name === "Yes"
      ) {
        alert("No");
      } else {
        const uri = `/api/seguridad/payment/upd/${this.props.auth.id}`;
        saxios
          .put(uri, {
            id: this.props.auth.id,
            usernames: this.state.name,
            course: this.state.course,
            sub: this.state.sub,
            card: this.state.card,
          })
          .then(({ data }) => {
            alert("El pago ha sido efectuado exitosamente");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  componentDidMount()
  {
    const id = this.props.match.params.id;
    saxios.get(
      `/api/subscriptions/subscriptions/${id}`
    )
    .then((data) => {
      //alert(JSON.stringify(data.data));
      this.setState({
        name: data.data.userCompleteName,
        course: data.data.userCourse,
        sub: data.data.userSubscription,
        card: data.data.userCard,
      });
    })
    .catch((e)=>{ 
      console.log(e);
    })
  }

  render() {
    const id = this.props.match.params.id;
    var {sku, Precio, DescLong} = this.state;
    const action ="Efectuando Pago";
    const selectItems = [
      { value: "Curso Garifuna Nivel Principiante", dsc: "Curso Garifuna Nivel Principiante" },
      { value: "Curso de Procesos Morfológicos", dsc: "Curso de Procesos Morfológicos" },
      { value: "Curso Garífuna Nivel Intermedio", dsc: "Curso Garífuna Nivel Intermedio" },
      { value: "Curso Garífuna Nivel Avanzado", dsc: "Curso Garífuna Nivel Avanzado" },
    ];
    const selectItemsS = [
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
      <Input
        name="email"
        caption="Email"
        value={this.state.email}
        onChange={this.onChangeHandler}
        error={this.state.emailError}
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
        caption="Subscripcion"
        onChange={this.changeCMB}
      />,
      <Input
        name="card"
        caption="Card"
        value={this.state.card}
        onChange={this.onChangeHandler}
        error={this.state.cardError}
        className="col-s-12"
      />,
    ];
    if (this.props.auth && this.props.auth.isLogged && true){
      return (
        <Page pageTitle={sku} auth={this.props.auth}>
        <h1 className="detailitem">{sku}</h1>
        <h2 className="detailitem">{Precio}</h2>
        <span className="detailitem">{DescLong}</span>
        <Form
            title={action}
            id="form-update-user"
            content={formContent}
            redirect="/"
            onClick={this.onClickUpdate}
          />
      </Page>
      );
    } else {
      return(
        <Page>
        <h1 className="detailitem">{sku}</h1>
        <h2 className="detailitem">{Precio}</h2>
        <span className="detailitem">{DescLong}</span>
        <div onClick={this.props.history.push('/login')}> login </div>
        </Page>
      );
    }

  }
}
