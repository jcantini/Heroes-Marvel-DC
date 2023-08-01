import { types } from "../types/types";


export const authReducer = ( state = {}, action ) => { 


    switch ( action.type ) {
        case types.login:
            return { // Este es el state que devuelvo cuando action es login
                ...state, // siempre ponerlo por si acaso llego a tener en el futuro más propiedades
                logged: true,
                user: action.payload
            };

        case types.logout:
            return {
                ...state,
                logged: false, 
                user: null 
               };
    
        default:
            return state;
    }
}