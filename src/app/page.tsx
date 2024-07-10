/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

import ProgressBar from "./_components/ProgressBar";
import Controls from "./_components/Controls";

import FirstStep from "./_components/Steps/FirstStep";
import SecondStep from "./_components/Steps/SecondStep";

import { useFormSlice } from "@jebe/stores/form";

const page = () => {
  const processStep = useFormSlice((state) => state.processStep);

  const steps = [
    {
      icon: "user",
    },
    {
      icon: "church"
    },
    {
      icon: "ticket",
    },
    {
      icon: "payment",
    },
    {
      icon: "clipboard",
    }
  ];

  const initialValues = {
    cedula: "",
    email: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    celular: "",
    pais: "",
    provincia: "",
    ciudad: "",
    iglesia: ""
  }

  const validationSchema = Yup.object({
    cedula: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    nombre: Yup.string().required("Campo requerido"),
    apellido: Yup.string().required("Campo requerido"),
    fechaNacimiento: Yup.string().required("Campo requerido"),
    celular: Yup.string().required("Campo requerido"),
    pais: Yup.string().required("Campo requerido"),
    provincia: Yup.string().required("Campo requerido"),
    ciudad: Yup.string().required("Campo requerido"),
    iglesia: Yup.string().required("Campo requerido")
  });

  return (
    <section className='flex flex-row w-full'>
      <div className='w-1/2 h-full p-5 flex justify-center items-center'>
        <Card fullWidth>
          <CardHeader>
            <ProgressBar processStep={processStep} steps={steps} />
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => console.log(values)}
            >
              <Form>
                {
                  processStep === 0 ? <FirstStep /> : 
                  processStep === 1 ? <SecondStep /> : null
                }
              </Form>
            </Formik>
          </CardBody>
          <CardFooter>
           <Controls />
          </CardFooter>
        </Card>
      </div>
      <div className='w-1/2 h-full'></div>
    </section>
  )
}

export default page