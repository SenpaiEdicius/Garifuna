import React from "react";
export default (props) => {
  return (
    <fieldset>
      <legend htmlFor={props.name} className="main-color">
        {props.caption}
      </legend>
      <br />
      <select
        name={props.name}
        id={props.id}
        key={props.id}
        className={props.className ? props.className : "col-s-12"}
        onChange={props.onChange}
      >
        {props.item.map((option) => {
          return <option value={option.value}>{option.dsc}</option>;
        })}
      </select>
    </fieldset>
  );
};