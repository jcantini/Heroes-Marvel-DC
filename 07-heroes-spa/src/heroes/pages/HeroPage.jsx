import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";

export const HeroPage = () => {

  const { id } = useParams(); // (1)

  const navigate = useNavigate();

  // Cada vez que se renderize este componente se vuelve a ejecutar esta función. En este caso no hay 
  // necesidad de volver a renderizar porque solo es para mostrar datos.
  //  De todas formas lo hago para mostrar cómo se hace. 

  // const hero = getHeroById( id ); Esta es la línea que voy a reemplazar
  // Solo se dispara cuando sus dependencias cambien. En este caso cuando cambie el id
  const hero = useMemo( () => getHeroById( id ), [ id ]);  

  const onNavigateBack = () => {
    navigate( -1 ); // -1 lo manda a la página anterior. También puedo detectar si es hero de DC vuelvo a DC
  }                 // si no vuelvo a Marvel

  if( !hero ) {
    return <Navigate to="/marvel"/>
  }

  return (
   <div className="row mt-5">
      <div className="col-4">
        <img 
          src={`/heroes/${id}.jpg`} 
          alt={ hero.superhero }
          className="img-thumbnail animate__animated animate__backInLeft"
        />
      </div>

      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> <b>Alter ego:</b> { hero.alter_ego } </li>
          <li className="list-group-item"> <b>Publisher:</b> { hero.publisher } </li>
          <li className="list-group-item"> <b>First appearance:</b> { hero.first_appearance } </li>
        </ul>

        <h5 className="mt-3">  Characters </h5>
        <p>{ hero.characters }</p>

        <button 
          className="btn btn-primary"
          onClick={ onNavigateBack }  
        >
          Return
        </button>
      </div>
   </div>


  )
}


// (1)
// useParams es un custom hook que lo provee React Router que nos sirve para obtener los parametros
// me devuelve un objeto del cual desestructuro el id que puse cuando defini la ruta.


