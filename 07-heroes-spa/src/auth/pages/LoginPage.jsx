import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const LoginPage = () => {

  const { login } = useContext( AuthContext ); // Accedo al contexto para tomar la función de login
  const navigate = useNavigate();

  // Cuando se dispara el onLogin, este debe disparar la action de login
  const onLogin = () => {

    login( 'Jorge Cantini' ); // Hago el login del usuario con la  función del provider

    navigate( '/', { // Al dar click en el logout me lleva al home
      replace: true,    // evita que se pueda volver al historial anterior ya que se dio logout
    }); 
}

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button 
        className="btn btn-primary"
        onClick={ onLogin}
      >
        Login
      </button>
    </div>

  )
}

