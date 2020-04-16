import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Page.css';
export default ({pageTitle, children, auth})=>{
  return(
    <section className="page">
      <Header auth={auth} title={pageTitle||'Page'}></Header>
      <main>
        {children}
      </main>
      <Footer auth={auth}></Footer>
    </section>
  );
}
