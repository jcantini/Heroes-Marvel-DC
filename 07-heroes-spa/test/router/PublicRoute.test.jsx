import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth"
import { PublicRoute } from "../../src/router/PublicRoute"

describe('Pruebas en <PublicRoute/>', () => {

    test('Debe de mostrar el children si no está autenticado', () => {
      
        // Para hacer esta prueba hay que preparar algunas cosa
        //Necesito establecer el contexto
        const contextValue = {
            logged: false
        };

        render (
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>    
            </AuthContext.Provider>
        );
        //screen.debug();
        expect( screen.getByText('Ruta pública') ).toBeTruthy();
    });

    test('Debe de navegar si está autenticado', () => {
      // Si estoy autenticado tengo que navegar a la página de marvel y debo asegurarme que sea
      // esta página la que se renderizó. No necesito renderizar la página en sí solo poder comprobar
      // que etoy llegando a esa página.
      // 1ero copio el render y contextValue. Si quiero simular una navegación, tengo que hacerlo dentro 
      // del contexto de un router para esto aplico el MemoryRouter y le asgigno la página inicial a donde 
      // se encuentra. Defino también 2 rutas una privada la de marvel y otra con la ruta pública la de login.
        const contextValue = {
            logged: true,
            user: {
                name: 'Jorge',
                id: 'ABD123'
            }
        };

        render (
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>    
                        } />
                        <Route path='marvel' element={ <h1>Página Marvel</h1> } />
                    </Routes>
    
                </MemoryRouter>
            </AuthContext.Provider>
        );

        screen.debug(); // Ver que se muestra la pagina de marvel xq el user está autenticado
        expect(screen.getByText('Página Marvel')).toBeTruthy();
    })
    

 
    
  
})
