import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../auth"

export const PublicRoute = ( {children} ) => {
    // Necesito saber si el usuario está autenticado o no
    const { logged } = useContext( AuthContext );

  // Ahora chequeo si está autenticado. Si lo está, no permito renderizar el login. Sino regreso el children 
  // que es un jsx con los hijos que puede renderizar
    return (logged)
        ? <Navigate to="/marvel" />
        : children
}


// Es un functional component normal salvo porque recibe al children que hase que este componente sea un
// High Order Component es decir, estoy recibiendo a los componentes que van a estar dentro de este componente.
