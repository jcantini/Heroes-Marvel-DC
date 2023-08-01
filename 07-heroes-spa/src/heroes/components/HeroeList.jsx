import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers"
import { HeroeCard } from "./HeroeCard";



export const HeroeList = ( { publisher }) => {
    // uso useMEmo como explico en HeroPage
    //const heroes = getHeroesByPublisher( publisher );
    const heroes = useMemo( () => getHeroesByPublisher( publisher ), [ 'publisher' ]) ;

    return (
         <div className="row rows-cols-1 row-cols-md-3 g-3">  {/* Propiedades de bootstrap*/}
            { 
             heroes.map( heroe => ( 
                    <HeroeCard 
                        key= { heroe.id } // paso la key
                        { ...heroe } // mando todo el objeto desestructurado xq asi lo espera HeroeCard
                    />
                 ))
            }
        </div>
    )
}

