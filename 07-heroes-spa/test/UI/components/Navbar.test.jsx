import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/UI/components/Navbar";

// (0) Para hacer un mock de un custom hook se hace jest.mock( 'path del hook' ) ver en test de hooks
// En este caso el hook está en una librería de react-router
// (1) al hacer el mock de react-router-dom pierdo el import de MemoryRouter que necesito para las pruevas
// Me cree un mock de una función y cuando en el render se llame a navigate en realidad se estrá llamando a esta fucnión 
// mockedUseNavigate que es contra la que voy a testear.
// (3) indico que me desestructure todo lo que viene de react-router-dom para que me quede accesible lo que necesite como MemoryRouter
// y solo sobrescribo el useNavigate en (2)
// Con todo esto queda explicado como puede probarse lago que viene de una librería
const mockedUseNavigate = jest.fn(); // (2)
jest.mock('react-router-dom', () => ({ // (1)
    ...jest.requireActual('react-router-dom'),  // (3)
    useNavigate: () => mockedUseNavigate // (2)
}))


describe('Pruebas en el componente <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Jorge'
        },
        logout: jest.fn() // como tengo que evaluar que se llama la función logout me genero una
    }

    // Cuando se usa una jest.fn(), es importante hacer un beforeEach haciendo un clearAllMocka
    // para que estén limpias antes de cada prueba
    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el nombre del usuario logueado', () => {

        render( // Monto el componente a renderizar
            <AuthContext.Provider value= { contextValue }>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        screen.debug(); // Para constatar que tengo en name en el html
        expect(screen.getByText('Jorge')).toBeTruthy();

      
    });
    
     
    test('Deba llamar al logout y navigate a /login y al dar click al botón ', () => {
        // Para probar el navigate, hay que hacer un mock de usenavigate para asegurarme que la función fue llamada

        render( // Monto el componente a renderizar
            <AuthContext.Provider value= { contextValue }>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button'); // solo hay uno por eso no necesito ponerle un aria al button
        fireEvent.click( logoutBtn ); // disparo el click sobre el botón 

        expect( contextValue.logout).toHaveBeenCalled();

        // De alguna forma tengo que poder determinar si navigate = useNAvigete() fue llamada. Y navigate está llamando a 
        // useNAvigete() que es un hook que voene de react-router-dom. Necesito importarme el hook pero cómo? (0)

        expect( mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
        // Para saber lo que debo colocar dentro de toHaveBeenCalledWith, 1ero corro el test si solo con () y veo
        // en el error que me tira que es lo que se recibe y eso es lo que laso a toHaveBeenCalledWith

  
    });
  
})
