import React from "react";
import {Link } from "react-router-dom";
export default (props) => {
  return (
    <div className="page-single">
      <br />
      <div className="action-title">
        <h1 className="center">{props.title}</h1>
      </div>
      <form
        id={props.id}
        name={props.name}
        className={
          props.className
            ? props.className
            : "single col-s-10 col-m-8 col-5 col-l-4"
        }
      >
        {props.content.map((items) => {
          return items;
        })}
        <br />
        <div className="buttons col-s-12 center col-offset-m-7 col-offset-4 col-offset-l-6">
          <button
            className="col-s-12 col-m-2 col-4 col-l-3 button-3"
            type="button"
            onClick={props.onClick}
          >
            Aceptar
          </button>
          &nbsp;
          <Link
            to={props.redirect}
            className="col-s-12 col-m-2 col-4 col-l-3 button-3 "
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};