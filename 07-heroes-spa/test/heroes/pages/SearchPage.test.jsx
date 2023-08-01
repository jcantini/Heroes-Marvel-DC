import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes/pages/SearchPage'

const mockedUseNavigate = jest.fn(); // Ver explicaion en Navbar.test
jest.mock('react-router-dom', () => ({ 
    ...jest.requireActual('react-router-dom'),  
    useNavigate: () => mockedUseNavigate 
}));

describe('Pruebas en <SearchPage/>', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrarse correctamente con los valores por defecto', () => {
      // En este caso hago la prueba usando el snapshot. Viendo el componente, se usa el useNavigate
      // y el useLocation por lo que necesito usar el MemoryRouter
      const { container } = render( // tomo el snapshot que guardo en el container
        <MemoryRouter>
            <SearchPage/>
        </MemoryRouter>
      )

      // screen.debug(); // Para ver lo que tengo
      expect( container ).toMatchSnapshot();
    });

    test('Debe mostrar a Batman y el input con el valor del queryString', () => {
        render( // tomo el snapshot que guardo en el container
          <MemoryRouter initialEntries={['/search?q=batman']}>
              <SearchPage/>
          </MemoryRouter>
        )
  
        //screen.debug(); // Para ver lo que 
        
        const input = screen.getByRole('textbox') // capturo el input
        expect( input.value ).toBe('batman');

        // Voy a chequear que se muestre una imagen de batman
        const img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg')  // src lo saque del screen.debug

        // Evaluo que el div que muestra el error tiene display: none
        screen.debug();
        const div = screen.getByLabelText('notFound');
        console.log(div.style) // veo como es la estructura
        expect(div.style.display).toBe('none')
      });

      test('Debe mostrar un error si no se encuenta el hero batman123', () => {
        render( 
          <MemoryRouter initialEntries={['/search?q=batman123']}>
              <SearchPage/>
          </MemoryRouter>
        );
        screen.debug();
        const div = screen.getByLabelText('notFound');
        expect(div.style.display).toBe('')
      });

      test('Debe llamar el navigate a la pantalla nueva', () => {

        const inputValue = 'superman'
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox'); // capturo e input
        fireEvent.change( input, {target: { name: 'searchText', value: inputValue}}) // lo cargo con un valor
        console.log(input.value); // Para comprobar que tengo superman en el input

        // Busco ahora el form al que le tengo que agregar un aria/label xq si no no lo encuentra
        const form = screen.getByRole('form'); // ya accedo al form
        fireEvent.submit( form ); // ejecuto el submit fel form
        
        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${inputValue}`);
    });
      
    
  
})
