import * as Yup from 'yup';

const stepOne = [
        Yup.object({
            identificationCard: Yup.string().required("La cédula es requerida	"),
            email: Yup.string().email("Email inválido").required("El email es requerido"),
            fistname: Yup.string().required("El nombre es requerido"),
            lastname: Yup.string().required("El apellido es requerido"),
            birthDay: Yup.date().required("La fecha de nacimiento es requerida"),
            cellphone: Yup.string().required("El celular es requerido"),
            contact: Yup.string().required("El contacto es requerido")
        })
    ,
        Yup.object({
            country: Yup.string().required("El país es requerido"),
            state: Yup.string().required("La provincia es requerida"),
            city: Yup.string().required("La ciudad es requerida")
        })
];

const stepTwo = [
        Yup.object({
            church: Yup.string().required("La iglesia es requerida")
        })
];

const stepThree = [];

const schemeValidation = [stepOne, stepTwo, [], [], []];

const getValidationProcess = (processStep: number, step: number) => {
    const currentValidationScheme = schemeValidation?.[processStep];
    if(Array.isArray(currentValidationScheme) && currentValidationScheme.length > 0){
      return currentValidationScheme[step];
    }else{
      return currentValidationScheme;
    }
  }

const numberOfSteps = schemeValidation.length;

const getNumberOfSubSteps = (processStep: number) => Array.isArray(schemeValidation[processStep]) && schemeValidation[processStep]?.length - 1;

export {getValidationProcess, getNumberOfSubSteps, schemeValidation, numberOfSteps};