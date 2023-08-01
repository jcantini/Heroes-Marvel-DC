import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {

    test('Debe mostrar el loging si no está autenticado', () => {

        // Creo el contexto para caso no autenticado
        // En PublicRouter está explicado el uso de alguna de las cosas que uso acá.
        // En MemoryRouter puse cualquier ruta que no sea /login para asegurarme que voy a muetrar /login
        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}> 
                <AuthContext.Provider value={ contextValue }> 
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )  
        
        screen.debug(); // Para ver que estoy en /login
        expect(screen.getAllByText('Login')).toBe(2);
    });

    test('Debe de mostrar el componente de marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC123',
                name: 'Jorge'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}> 
                <AuthContext.Provider value={ contextValue }> 
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )  
        
        screen.debug(); // Para ver que estoy en /marvel
        expect(screen.getAllByText('Marvel')).toBeGreaterThan(1);
    })
    
});
