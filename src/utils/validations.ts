import * as Yup from 'yup';

const stepOne = [
        Yup.object({
            cedula: Yup.string().required("La cédula es requerida	"),
            email: Yup.string().email("Email inválido").required("El email es requerido"),
            nombre: Yup.string().required("El nombre es requerido"),
            apellido: Yup.string().required("El apellido es requerido"),
            fechaNacimiento: Yup.string().required("La fecha de nacimiento es requerida"),
            celular: Yup.string().required("El celular es requerido"),
        })
    ,
        Yup.object({
            pais: Yup.string().required("El país es requerido"),
            provincia: Yup.string().required("La provincia es requerida"),
            ciudad: Yup.string().required("La ciudad es requerida")
        })
];
const stepTwo = [
        Yup.object({
            iglesia: Yup.string().required("La iglesia es requerida")
        })
];
const stepThree = [];

const schemeValidation = [stepOne, stepTwo, [], [], []];
export default schemeValidation;