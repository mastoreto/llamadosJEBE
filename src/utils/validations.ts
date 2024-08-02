/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as Yup from 'yup';

const stepOne = [
        Yup.object({
            identificationCard: Yup.string().required("La cédula es requerida	"),
            email: Yup.string().email("Email inválido").required("El email es requerido"),
            firstname: Yup.string().required("El nombre es requerido"),
            lastname: Yup.string().required("El apellido es requerido"),
            birthDay: Yup.date().required("La fecha de nacimiento es requerida"),
            cellphone: Yup.string().required("El celular es requerido"),
            contact: Yup.string().required("El contacto es requerido")
        }),
        Yup.object({
            country: Yup.string().required("El país es requerido"),
            state: Yup.string().required("La provincia es requerida"),
            city: Yup.string().required("La ciudad es requerida")
        }),
        Yup.object({
            church: Yup.string().required("La iglesia es requerida"),
            areas: Yup.string().required("Las áreas son requeridas"),
            recurrentParticipant: Yup.string().required("Debes indicar si has participado anteriormente")
        }),
];

const stepTwo = [
        Yup.object({
            church: Yup.string().required("La iglesia es requerida"),

        })
];

const schemeValidation = [stepOne, stepTwo, [Yup.object({
  foodPackage: Yup.string().required("Debes seleccionar una opción"),
  hotelPackage: Yup.string().required("Debes seleccionar una opción"),
}),Yup.object({})], [Yup.object({})], [Yup.object({})]];

const getValidationProcess = (processStep: number, step: number) => {
    const currentValidationScheme = schemeValidation[processStep];

    if(Array.isArray(currentValidationScheme) && currentValidationScheme.length > 0){
      return currentValidationScheme[step];
    }else{
      return currentValidationScheme?.[step];
    }
  }

const numberOfSteps = schemeValidation.length;

const getNumberOfSubSteps = (processStep: number): number =>{

  if( Array.isArray(schemeValidation[processStep])){
    return Number(schemeValidation[processStep].length)
  }

  return 0;
};

export {getValidationProcess, getNumberOfSubSteps, schemeValidation, numberOfSteps};