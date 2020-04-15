import React from "react";
import { Link } from "react-router-dom";
export default (props) => {
    return (
      <form
        key={props.id}
        id={props.id}
        name={props.name}
        className={
          props.className
            ? props.className
            : "form col-s-10 col-m-7 col-5 col-l-4"
        }
      >
        <h2>Información Básica</h2>
        <br />
        <div className="line"></div>
        <br />
        {props.content.map((items) => {
          return items;
        })}
        
        <br />
        <div className="buttons center col-offset-4 col-offset-l-6">
          {(props.loading && true) ? null:(<button
            className="col-s-12 col-m-6 col-5 col-l-5 button-3"
            type="button"
            onClick={props.onClick}
          >
            Pagar
          </button>)}
          &nbsp;
          {(props.loading && true) ? null:(<Link
            to={props.redirect}
            className="col-s-12 col-m-6 col-5 col-l-5 button-3 "
          >
            Cancelar
          </Link>)}
          
        </div>
      </form>
    );
 
};