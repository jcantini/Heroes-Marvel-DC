// Este es un mi custom hook que sirve para usarlo como un template de un formulario con inputs

import { useState } from "react";

export const useForm = ( initialForm = {} ) => {// recibo la estructura de campos que tiene el form

    const [formState, setFormState] = useState( initialForm );  


    const onInputChange = ({ target: {name, value} }) => { // Desestructuro el target del evento que recibo
     //   const {name, value } = target;  // Del target desestructuro del input el nombre  y su valor
        setFormState({ 
            ...formState,
            [ name ]: value // uso [] pra indicar que interprete name como nombre de la propiedad
        });
    }

    const onResetForm = () => {
        setFormState( initialForm )
    }

    return {
        ...formState, // (1)
        formState,
        onInputChange,
        onResetForm
    }
}

// (1)
// el ...formstate es para que me devuelva las propiedades del objeto formState de forma desestructurada. De 
// esta manera al definir useForm en un componente puedo usar directamente un objeto con los nombre de los campos.
// Aí está hecho en TodoAdd.jsx
// La otra forma es recibir directamente "formState" y desestructurarlo en otra constante como está hecho en
// FormWithCustomerHook.jsx o en la misma línea de la siguiente forma:
// const {formState: {description}, onInputChange, onResetForm} = ...