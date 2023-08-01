import { Link } from "react-router-dom"

export const HeroeCard = ({ // Desestructuro las props del objeto heroe
    id,
    superhero, 
    publisher, 
    alter_ego,
    first_appearance,
    characters
}) => {

    const heroImageUrl = `/heroes/${ id }.jpg`

    return ( // Lo diseño como una tarjeta de bootsprap
        <div className="col animate__animated animate__">
          <div className="card">

            <div className="row no-gutters">

                <div className="col-4">
                    <img src={ heroImageUrl } className="card-img" alt={superhero}/>
                </div>

              <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">{ superhero }</h5>
                    <p className="card-text">{ alter_ego }</p>

                    {/* Si alter_ego = character quiero mostrarlo solo 1 vez */}
                    {
                      ( alter_ego  !== characters ) && (<p>{ characters }</p> )
                    }

                    <p className="card-text">
                      <small className="text-muted" >{ first_appearance }</small>
                    </p>

                    <Link to={`/hero/${ id }`}>
                        Más información...
                    </Link>
                    
                  </div>
              </div>
            </div>
          </div>
          
        </div>
  )
}
