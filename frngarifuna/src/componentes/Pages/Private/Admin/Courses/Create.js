import React, { Component } from 'react';
import Page from '../../../Page';
import Input from '../../../../Forms/Input/Input';
import Form from "../../../../Forms/Payment/Form";
import Select from '../../../../Forms/Select/Select';
import { longStringRegex, emptyRegex, edadRegex } from '../../../../Forms/Validators/Validators';
import { saxios } from '../../../../Utilities/Utilities';

export default class CreateCourse extends Component{
    constructor(){
        super();
        this.state ={
            name: '',
            nameError: null,
            desc: '',
            descError: null,
            req:'',
            reqError: null,
            act: "false"
        }
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.changeCMB = this.changeCMB.bind(this);
        this.validate = this.validate.bind(this);
    }

    onClickUpdate(e){
        e.preventDefault();
        e.stopPropagation();
        const errors = this.validate(this.state);
        if (errors) {
          this.setState({ ...this.state, ...errors });
        } else{
            const { name,  desc, req} = this.state;
            const Req = parseInt(req);
            if(Req===0 || Req>10000){
                alert("Ingrese un precio mas adecuado.");
            }
            else{
                const uri = '/api/admin/courses/new';
                saxios.post(uri,{
                    name: this.state.name,
                    desc: this.state.desc,
                    req: this.state.req,
                    act: this.state.act
                })
                .then(({ data }) => {
                    alert("Ha sido ingresado correctamente el curso");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Ha ocurrido un error. Intente nuevamente");
                });
            }
        }
    }

    validate(state){
        let nameErrors = false;
        let tmpErrors = [];
        const { name,  desc, req} = state;
        if (name !== undefined) {
          if (!longStringRegex.test(name) || emptyRegex.test(name)) {
            tmpErrors.push("Ingrese el nombre del curso nuevo: ");
          }
          if (tmpErrors.length) {
            nameErrors = Object.assign({}, nameErrors, { nameError: tmpErrors });
          }
        }
        if (desc !== undefined) {
            let tmpErrors = [];
            if (!longStringRegex.test(desc) || emptyRegex.test(desc)) {
              tmpErrors.push("Ingrese una descripción del curso: ");
            }
            if (tmpErrors.length) {
              nameErrors = Object.assign({}, nameErrors, { descError: tmpErrors });
            }
        }
        if (req !== undefined) {
            let tmpErrors = [];
            if (!longStringRegex.test(req) || emptyRegex.test(req)) {
              tmpErrors.push("Ingrese el precio del curso: ");
            }
            if (tmpErrors.length) {
              nameErrors = Object.assign({}, nameErrors, { reqError: tmpErrors });
            }
        }

        return nameErrors;
    }

    onChangeHandler(e){
        const {name, value} = e.currentTarget;
        let errors = this.validate({[name]:value});
        if(!errors){
            errors = {[name+"Error"]:''};
        }
        this.setState({
            ...this.state,
            [name]:value,
            ...errors
        })
    }

    changeCMB(e){
        this.setState({ act: e.target.value });
    }

    render(){
        const action ="Crear Curso";
        const selectItems=[
            { value: "false", dsc: "Inactivo" },
            { value: "true", dsc: "Activo" }
        ]
        const formContent = [
            <Input
                name="name"
                caption="Nombre del Curso"
                value={this.state.name}
                onChange={this.onChangeHandler}
                error={this.state.nameError}
                className="col-s-12"
            />,
            <Input
                name="desc"
                caption="Descripción del Curso"
                value={this.state.desc}
                onChange={this.onChangeHandler}
                error={this.state.descError}
                className="col-s-12"
            />,
            <Input
                name="req"
                caption="Precio del Curso"
                value={this.state.req}
                onChange={this.onChangeHandler}
                error={this.state.reqError}
                className="col-s-12"
            />,
            <Select
            name="act"
            id="act"
            item={selectItems}
            caption="Activacion del Curso"
            onChange={this.changeCMB}
            />,
          ];
        return(
            <Page pageURL="CreateCourse" auth={this.props.auth}>
                <Form
                    title={action}
                    id="form-update-user"
                    content={formContent}
                    redirect="/"
                    onClick={this.onClickUpdate}
                />
            </Page>
        )
    }
}