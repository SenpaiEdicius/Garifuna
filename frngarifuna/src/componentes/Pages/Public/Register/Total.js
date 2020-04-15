import React, { Component } from "react";

export default class Total extends Component {
  render() {
    return (
      <div className={this.props.className ? this.props.className : "total col-s-10 col-m-3 col-offset-1 center"}>
        <h2>Total a Pagar</h2>
        <br />
        <div className="line"></div>
        <br />
        <h3 className="orange">{this.props.price === undefined?"$ 5.99":"$ "+this.props.price }</h3>
      </div>
    );
  }
}