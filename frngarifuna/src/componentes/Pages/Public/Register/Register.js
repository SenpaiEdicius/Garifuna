//ARREGLAR ESTO

import React, { Component } from "react";
import Page from "../../Page";
import { Link, Redirect } from "react-router-dom";
import { saxios, paxios, setLocalStorage } from "../../../Utilities/Utilities";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount()
  {
    const id = this.props.match.params.id;
    saxios.get(
      `/api/subscriptions/subscriptions/${id}`
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
    var {sku, Precio, DescLong} = this.state;
    return (
      <Page pageTitle={sku} auth={this.props.auth}>
      <h1 className="detailitem">{sku}</h1>
      <h2 className="detailitem">{Precio}</h2>
      <span className="detailitem">{DescLong}</span>
    </Page>
    );
  }
}
