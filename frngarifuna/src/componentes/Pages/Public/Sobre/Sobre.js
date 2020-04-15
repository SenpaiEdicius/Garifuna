import React, { Component } from "react";
import { Link } from "react-router-dom";
import Page from "../../Page";
import './sobre.css';
export default ({auth})=>{
    return (
        <Page pageURL="WELCOME?" auth={auth}>
            <section className="page-landing">
                <div className="landing-photo col-s-12 col-m-9 col-10 no-padding">
                    <h2 className="titulo">Sobre Nosotros</h2>
                </div>
                <div class="container22">
El Equipo de Katabu esta intregrado por estudiantes de la Clase de Seminario de Software del primer periodo academico del 2020.
Decidimos Crear Este proyecto para poder Preservar la lengua Garifuna, porque es un Patrimonio Nacional, y Creemos que cualquier persona ya sea de nacionalidad Hondureña o no, que este interesada en aprenderla puede hacerlo.
</div>
  <div class="container2">
El garífuna pertenece a la familia lingüística arahuaca, una de las másextensas del continente americano. Esta familia se extiende por Belice,Guatemala, Honduras, Nicaragua, Bolivia, Guyana, Guayana France-sa, Surinam, Venezuela, Colombia, Perú y Brasil, y comprende apro-ximadamente 40 lenguas aun vivas (cfr. Aikhenvald 1999:65). Como se aprecia en la Figura 1, adaptada de la clasificación ofrecida en laversión electrónica del Ethnologue,
así como en la propuesta de Pay-ne (1991), el garífuna pertenece a la rama caribeña del tronco norte dela familia arahuaca; sus parientes más cercanos son el guajiro (Co-lombia-Venezuela), el locono o arahuaco (Surinam) y los extintostaino (Antillas) y paraujano (Venezuela). El prefijo de primera perso-na en estas lenguas esta-~da-; por ello, Payne (1991) las denomina ta-maipureanas.

</div>

                <section className="courses col-s-12 col-m-3 col-2 no-padding">
                    <h2 className="col-s-12"></h2>
                </section>
            </section>
        </Page>
    );
}
