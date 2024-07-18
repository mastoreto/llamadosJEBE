/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

import ProgressBar from "./_components/ProgressBar";
import Controls from "./_components/Controls";

import Steps from "./_components/Steps";

import { useFormSlice } from "@jebe/stores/form";
import schemeValidation from "@jebe/utils/validations";

const page = () => {
  const processStep = useFormSlice((state) => state.processStep);
  const step = useFormSlice((state) => state.step);

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


  return (
    <section className='flex flex-row w-full'>
      <div className='w-1/2 h-full p-10 flex justify-center items-center'>
      <Formik
              initialValues={initialValues}
              validationSchema={schemeValidation?.[processStep]?.[step] ?? {}}
              onSubmit={(values) => console.log(values)}
            >
        <Card 
          fullWidth
          className=""
        >
          <CardHeader>
            <ProgressBar processStep={processStep} steps={steps} />
          </CardHeader>
          <CardBody>
          
              <Form>
               <Steps />
              </Form>
        
          </CardBody>
          <CardFooter>
           <Controls />
          </CardFooter>
        </Card>
        </Formik>
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