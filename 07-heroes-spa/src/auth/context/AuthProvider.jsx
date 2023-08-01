// El AuthProvider utiliza el AuthContext con el objetivo de que este sea el componente que sirve para
// proveer la información a toda la la app.
// Es un funtional componente normal salvo que la diferencia es que voy a recibir como props el children 
// o sea todos los componentes hijos y genero el proveedor de información. Ahora debo crear el reducer

import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

import { types } from '../types/types';

// const initialState = { (1)
//     logged: false
// };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user')); // El string que devuelve localstorage lo convierto 
                    // a un objeto que es como esta definido el usario. Si regresa null => No tengo un usuario.
  
  return  {
    logged: !!user, // Para que me quede true o false en base a si tengo o no user
    user: user
  }
}

export const AuthProvider = ( {children }) => {

    const [ authState, dispatch ] = useReducer( authReducer, {}, init ); // (1)

    // De alguna manera tengo que guardad en mi state el usuario que está conetado y
    // que usuario es. Para esto creo una fución que dispara una action.
    const login = ( name = '' ) => {

      const user = { id: 'ABC', name: name};

      const action = {
        type: types.login,
        payload: user
      }

      localStorage.setItem('user', JSON.stringify( user ))

      dispatch(action);
    };

    const logout = () => {
      localStorage.removeItem( 'user' );  // Elimino al user del localStorage
      const action = { type: types.logout };

      dispatch( action );
    }

  // Expongo a toda la aplicación la función de login y el state. El state lo mando desestructurado así tengo acceso
  // directamente a sus propiedades por su nombre. No me llega como un objeto sino cada propiedad.
  return (
    <AuthContext.Provider value={ {
      ...authState,
      login: login,
      logout: logout
    } }>
        { children }
    </AuthContext.Provider>
  )
}

// (1)
// Para hacer persistente la info del usuario (para que si hace un refresh no quede deslogeado), useReducer
// admite un 3r argumento que es una función de inicialización. La voy a usar para recuperar el user que 
// guarde en el localStorage al ejecutar la función login. Este 3r argumento cuando lo uso, hace la inicializacion
// del state y ya no tiene importancia el 2do argumento (initialStat) por lo que puedo ponerlo como {}, ya
// que lo reemplacé con la función del 3er argumento.


