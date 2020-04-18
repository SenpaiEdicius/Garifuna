//ARREGLAR ESTO
/*
import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from 'react-router-dom';
import Page from '../../Page';
import { paxios, saxios } from '../../../Utilities/Utilities.js';

import Input from "../../../Forms/Input/Input";
import Select from "../../../Forms/Select/Select";

export default class User extends Component {
  constructor(){
    super();
    this.state={}
   // this.loadMore = this.loadMore.bind(this);
   // this.onClickHandler = this.onClickHandler.bind(this);
 }
*/
 /*
 onClickHandler(e){
  const CourseID = e.target.href.substring(37,e.target.href.length)
  const uri = `/api/user/courses/add`;
  saxios.post(uri,{
    userID: this.props.auth.id,
    courseID: CourseID
  })
  .then(
    ({data})=>{
    }
  )
  .catch(
    (err)=>{
      console.log(err);
    }
  )
}

 loadMore(page){
    const items  = this.state.itemsToLoad;
    const uri = `/api/seguridad/${page}/${items}`;
    paxios.get(uri)
      .then(
        ({data})=>{
          //console.log(data);
          const { courses:apiItems, total} = data;
          const loadedItems = this.state.items;
          apiItems.map((e)=>loadedItems.push(e));
          if(total){
              this.setState({
                'items': loadedItems,
                'hasMore': (page * items < total)
               });
           } else {
             this.setState({
               'hasMore': false
             });
           }
         }
       )
       .catch(
         (err)=>{
           console.log(err);
         }
       );
   }*/
/*
   componentDidMount()
   {
     const id = this.props.match.params.id;
     saxios.get(
       `/api/seguridad/users/${id}`
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
  }*/