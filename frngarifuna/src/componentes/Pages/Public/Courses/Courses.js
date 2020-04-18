import './courses.css';
import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from 'react-router-dom';
import Page from '../../Page';
import { saxios } from '../../../Utilities/Utilities.js';

export default class Courses extends Component {
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
   const uri = `/api/courses/courses/${page}/${items}`;
   saxios.get(uri)
     .then(
       ({data})=>{
         console.log(data);
         const { courses: apiItems, total} = data;
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
      return ( // edita esto

        <div className="col-s-1235" key={item._id}>
          <h1 className="main-color">{item.sku} </h1>
          <h3>{item.DescCorta}</h3>
          <span>{item.DescLong}</span>
          <span className='updateListItem'>
          </span>
        </div>
      );
    } //hasta aki
  );

  if (!uiItems.length) uiItems.push(
    <div className="listItem" key="pbListAddOne">
      <span>No hay cursos disponibles</span>
    </div>);

  return (
    <Page pageTitle="Courses" auth={this.props.auth}>
      <h2 className="titulo1">Cursos</h2>
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
