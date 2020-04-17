//AGREGAR ENLACES AL REGISTER

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Page from "../../Page";
import './subscription.css';
import InfiniteScroll from 'react-infinite-scroller';
import { saxios } from '../../../Utilities/Utilities.js';

export default class Subs extends Component {
  constructor(){;
    super();
    this.state={
     items:[],
     hasMore:true,
     page:1,
     itemsToLoad:10
    }
    this.loadMore = this.loadMore.bind(this);
 }

 loadMore(page){
  const items  = this.state.itemsToLoad;
  const uri = `/api/subscriptions/subscriptions/${page}/${items}`;
  saxios.get(uri)
    .then(
      ({data})=>{
        console.log(data);
        const { subs: apiItems, total} = data;
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
 }

  render() {
    const uiItems = this.state.items.map(
      (item)=>{
        return (//edita esta parte para lo visual
          <div className="col-s-1" key={item._id}>
            <h1 className="main-color">{item.sku} </h1>
            <h2>{item.Precio}</h2>
            <span className='updateListItem'>
            </span>
            <Link to={`/register/${item._id}`}>Ver Detalles</Link>
          </div>);
      }
    );//hasta aqui lo demas no hagas nada lmao
  
    if (!uiItems.length) uiItems.push(
      <div className="listItem" key="pbListAddOne">
        <span>No hay subscripciones</span>
      </div>);
  
    return (
      <Page pageTitle="Subs" auth={this.props.auth}>
        <div className="list" ref={(ref)=> this.scrollParentRef = ref}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMore}
              hasMore={this.state.hasMore}
              useWindow={false}
              threshold={108}
              getScrollParent={()=>this.scrollParentRef}
              >
                {uiItems}
            </InfiniteScroll>
        </div>
      </Page>
     );
    }

}
