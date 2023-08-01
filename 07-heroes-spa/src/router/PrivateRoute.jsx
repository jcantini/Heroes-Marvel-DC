import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../auth"

// Esta es la implementación standard. Si quiero que al ingresar con login vuelvana la misma pantalla donde 
// estaba \usar useLocationr . ver clase 216 
export const PrivateRoute = ( {children} ) => {

    // Necesito saber si el usuario está autenticado o no
    const { logged } = useContext( AuthContext );

  // Ahora chequeo si está autenticado. Si lo está, permito renderizar los hijo, regreso el children que es
  // un jsx. Sino lo mando al login
    return (logged)
        ? children
        : <Navigate to="/login" />
}


// Es un functional component normal salvo porque recibe al children que hase que este componente sea un
// High Order Component es decir, estoy recibiendo a los componentes que van a estar dentro de este componente.

