
import { authReducer, types } from "../../../src/auth"

describe('Puebas en authReducer.js', () => {

    // Para probarlo, me creo el initialState
    const initialState = {
        logged: false
    };
  
    test('debe regresar el estado inicial', () => {
      const state = authReducer( initialState, {});
      // Al no mandar ninguna acción, {}, el reducer por el default, de devuelce el estado inicial que le pase.
      expect( state ).toBe( initialState ); // (1)
    
    })

    test('Debe llamar al login, autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Jorge Cantini',
            }
        };

        const state = authReducer( initialState, action);
        // console.log(state) // para revisar que tengo para poder hacer el expect
        expect( state ).toEqual( {logged: true, user: action.payload} );
    })
    
    test('Debe de borrar el name del usuario y poner logged en false', () => {
        const state = {
            logged: true,
            user: { id: 123, name: 'Jorge Cantini' }
        }

        const action = {
            type: types.logout
        };

         const newState = authReducer( state, action);
         console.log(newState) // para revisar que tengo para poder hacer el expect
         expect( newState ).toEqual( {logged: false, user: null} );
    })

})
