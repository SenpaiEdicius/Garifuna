//ARREGLAR ESTO

import React, { Component } from "react";
import Page from "../../Page";
import Payment from "../../../Forms/Payment/Payment";
import Input from "../../../Forms/Input/Input";
import Total from ".//Total";

import { Link, Redirect } from "react-router-dom";
import {
  emailRegex,
  emptyRegex,
  passwordRegex,
  nameRegex,
} from "../../../Forms/Validators/Validators";
import { paxios, setLocalStorage } from "../../../Utilities/Utilities";

export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameError: null,
      email: "",
      emailError: null,
      password: "",
      passwordError: null,
      price: "150 lps",
      plan: "0",
      redirect: false,
      url: "",
      loading: false,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.onClickSignIn = this.onClickSignIn.bind(this);
    this.startPayment = this.startPayment.bind(this);
  }

  componentDidMount() {
    const { plan } = this.props.match.params;
    if (plan === "2") {
      this.setState({ price: "14.99" });
    }
    if (plan === "3") {
      this.setState({ price: "59.99" });
    }
  }

  validate(state) {
    let nameErrors = null;
    let tmpErrors = [];
    const { email, password, name } = state;
    if (email !== undefined) {
      if (!emailRegex.test(email) || emptyRegex.test(email)) {
        tmpErrors.push("Ingrese un correo con un formato correcto");
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, { emailError: tmpErrors });
      }
    }
    if (password !== undefined) {
      tmpErrors = [];
      if (!passwordRegex.test(password) || emptyRegex.test(password)) {
        tmpErrors.push("Ingrese una contraseña con un formato válido");
        tmpErrors.push(
          "(Iniciar con mayúscula, contener un número, una minúscula, mínimo 8 caracteres y máximo 20)"
        );
      }
      if (tmpErrors.length) {
        nameErrors = Object.assign({}, nameErrors, {
          passwordError: tmpErrors.join(". "),
        });
      }
    }
    if (name !== undefined) {
      tmpErrors = [];
      if (!nameRegex.test(name) || emptyRegex.test(name)) {
        tmpErrors.push("Ingrese un correo con un formato correcto");
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

  onClickSignIn(e) {
    e.preventDefault();
    e.stopPropagation();
    let errors = this.validate(this.state);
    if (errors) {
      this.setState({ ...this.state, ...errors });
    } else {
      const { email, password, name } = this.state;
      if (
        email === "demo@demo.com" ||
        email === "demo@demo.demo" ||
        email === "test@test.com" ||
        email === "test@test.test" ||
        email === "aaa@aaa.aaa" ||
        email === "aaa@aaa.com" ||
        email === "aa@aa.aa"
      )
        alert("Escoga un correo mejor elaborado.");
      else {
        this.setState({ loading: true });
        let plan = this.props.match.params.plan;
        let months = 1;
        if (plan === "2")
            months=3;
        if (plan === "3")
            months=12;

        paxios
          .post("/api/user/register", {
            usernames: name,
            useremail: email,
            userpassword: password,
            months:months
          })
          .then((resp) => {
            //console.log(resp.data);
            setLocalStorage("jwt", resp.data.jwt);
            setLocalStorage("id",resp.data._id);
            setLocalStorage("type","CLI");
            console.log(resp.data)
            this.startPayment(resp.data._id)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  startPayment(id) {
    if (id !== undefined) {
      let plan = this.props.match.params.plan;
      let paymentData = {
        plan: "0",
        planDsc: "Mensual",
        price: "5.99",
        planFrequency: "",
      };
      if (plan === "2") {
        paymentData = {
          plan: "3",
          planDsc: "Trimestral",
          price: "14.99",
          planFrequency: "MONTH",
        };
      }
      if (plan === "3") {
        paymentData = {
          plan: "1",
          planDsc: "Anual",
          price: "59.99",
          planFrequency: "YEAR",
        };
      }
      paxios
        .post(`/api/user/payment/${id}`, paymentData)
        .then((resp) => {
          console.log(resp.data);
          setLocalStorage("token", resp.data.token);
          window.location.replace(resp.data.redirect);
        })
        .catch((error) => {
          console.log(error);
          alert("ocurrio un error 1, vuelve a intentarlo");
        });
    } else {
      alert("ocurrio un error 2, vuelve a intentarlo");
    }
  }

  render() {
    const price = this.state.price;
    let loading = this.state.loading;
    //console.log(loading)
    const formItems = [
      <Input
        key="1"
        name="name"
        caption="Nombre Completo"
        value={this.state.name}
        onChange={this.onChangeHandler}
        error={this.state.nameError}
        className="col-s-12 col-m-11"
      />,
      <Input
        key="2"
        name="email"
        caption="Correo Electónico"
        value={this.state.email}
        onChange={this.onChangeHandler}
        error={this.state.emailError}
        className="col-s-12 col-m-11"
      />,
      <Input
        key="3"
        name="password"
        caption="Contraseña"
        value={this.state.password}
        onChange={this.onChangeHandler}
        type="password"
        error={this.state.passwordError}
        className="col-s-12 col-m-6"
      />,
    ];
    if (this.state.redirect) {
      return <Redirect to={this.state.url} />;
    }
    return (
      <Page pageURL="SignIn">
      <div class="container55">
        <div className="page-register">
          <Total
            price={price}
            className="total center col-s-10 col-m-3 col-3 col-l-2 col-offset-s-1"
          />
          <Payment
            id="form-register"
            content={formItems}
            onClick={this.onClickSignIn}
            className="form col-s-10 col-m-7 col-6 col-l-5"
            redirect="/subscription"
            price={price}
            loading={this.state.loading}
          />
        </div>
          </div>
      </Page>
    );
  }
}
