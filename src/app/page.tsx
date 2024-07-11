/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import Image from "next/image";
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
    cedula: Yup.string().required("La cédula es requerida	"),
    email: Yup.string().email("Email inválido").required("El email es requerido"),
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    fechaNacimiento: Yup.string().required("La fecha de nacimiento es requerida"),
    celular: Yup.string().required("El celular es requerido"),
    pais: Yup.string().required("El país es requerido"),
    provincia: Yup.string().required("La provincia es requerida"),
    ciudad: Yup.string().required("La ciudad es requerida"),
    iglesia: Yup.string().required("La iglesia es requerida")
  });

  return (
    <section className='flex flex-row w-full'>
      <div className='w-1/2 h-full p-10 flex justify-center items-center'>
        <Card 
          fullWidth
          className=""
        >
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
      <div className='w-1/2 h-full flex justify-center items-center flex-col'>
        <Image
          src="/images/llamados.svg"
          alt="hero"
          width={250}
          height={250}
          objectFit="cover"
        />
          <Image
          src="/images/jebe.svg"
          alt="hero"
          width={50}
          height={50}
          objectFit="cover"
          className="my-5"
        />
      </div>
    </section>
  )
}

export default page