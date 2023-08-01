
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroeCard } from '../components';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation(); // (1)
 // console.log({location});  para ver que la propiedad search tiene el string con el query
 // const query = queryString.parse( location.search ); // queryString extrae todo lo que viene en el query
 // console.log( {query} ); // Para ver como lo extrae. Tener en cuenta que siempre devuelve strings
 // Directamente puedo desestructurar la q que es el 1er parámetro y el único en este caso
  const { q = ''} = queryString.parse( location.search ); //q pr default es '' por si no viene nada

  const heroes = getHeroesByName( q ); // Aca tengo el array de heroes encontrados o []

  const showSearch = (q.length === 0); // Devuelve true o false
  const showError = (q.length > 0) && heroes.length === 0;  // hay algo escrito y con eso no se encontro

  const { searchText, onInputChange } = useForm({ // Lo que desestructuro de lo que me devuelve el hook
      searchText: q // inicialmente q='' pero despues ya tiene un valor. Asignando q no lo pierdo si hago refresh
  });


  const onSearchSubmit = ( e ) => {
    e.preventDefault();
  //  if (searchText.trim().length <= 1) return;

    // Quiero armar una ruta de navegación pasándole un query con lo que se ingreso por el input. 
    // Para a navegar a la misma ruta en que me encuentro seria: navigate('')
    // Para navegar agregando un query parameter hago:
    navigate(`?q=${ searchText }`);

  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
          <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form aria-label="form" onSubmit={ onSearchSubmit }>
              <input 
                type="text" 
                placeholder="Search a Hero"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={ searchText }
                onChange={ onInputChange }
              />

              <button className="btn btn-outline-primary mt-2">
                  Search
              </button>
            </form>
          </div>

          <div className="col-7">
            <h4>Results</h4>
            <hr />

            {/* Esto se muestra mientra no se ingreso el texto de search */}
            {/* {
              ( q === '')
              ? <div className="alert alert-primary">Search a hero</div>
              : ( heroes.lenght === 0 )
            } */}
 
            <div aria-label="Found"className="alert alert-primary animate__animated animate__fadeInUp" 
                  style={{ display: showSearch ? '' : 'none'}}>
              Search a hero
            </div>

            {/* Esto se muestra cuando no se encontro */}
            <div aria-label="notFound" className= "alert alert-danger animate__animated animate__fadeInUp" 
                  style={{ display: showError ? '' : 'none'}}
            >
              Ho hero found with name <b>{ q }</b>
            </div>

            {
              heroes.map( hero => (
                  <HeroeCard key= {hero.id} { ...hero } />
              ))
            }


          </div>

      </div>


 
    </>
  )
}

// (1)
// De alguna forma tengo que leer el query parameter. En el navigate no tengo nada y tampoco en params
// Lo obtengo de la localización que me da la ruta donde me encuentro y en esta ruta figura el query