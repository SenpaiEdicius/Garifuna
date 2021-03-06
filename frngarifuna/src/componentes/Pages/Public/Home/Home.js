import React from 'react';
import Page from '../../Page';
import './home.css';

import {Link} from 'react-router-dom';
export default ({auth})=>{
    return (
        <Page pageTitle="KATABU" auth={auth}>
            <section className="page-landing">
                      <h2 className="titulo1">K A T A B U</h2>
                <h2 className="col-s-1">Cursos en línea</h2>
<p> Los cursos garanizados por Katabu son los mejores para aprender Garifuna de manera facil y rapida. Aprender garifuna es la opcion mas oportuna a la hora de querer conservar esta cultura hondureña.
Los garífuna son un grupo étnico descendiente de africanos y aborígenes caribes y arahuacos originario de varias regiones del Caribe. También se les conoce como garinagu, indios negros, caribes negros o Black Caribs.

</p>
            <h2 className="col-s-2">
            <Link className="button-3 col-s-8 col-m-5 col-3" to="/courses">Ver Cursos</Link> </h2>
                <section className="courses col-s-12 col-m-3 col-2 no-padding">
                </section>
            </section>
        </Page>
    );
}

/*
export default ({auth})=>{
  return (
    <Page pageTitle="Home Page" auth={auth}>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, quia vel? Iure eaque ipsam, magni animi debitis sapiente consequuntur quos repudiandae. Consequatur perferendis accusantium voluptatum harum, aliquid dolor repellendus facere.</p>
    </Page>
  )
}
*/
