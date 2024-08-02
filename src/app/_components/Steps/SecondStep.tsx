import React,{useMemo} from 'react';

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

import FieldSelect from './Inputs/FieldSelect';

import { useFormikContext, useField } from 'formik';

import { api } from '@jebe/trpc/react';

import { useFormSlice } from '@jebe/stores/form';
import { type InitialValues } from '@jebe/utils/types';

const SecondStep = () => {
  const { values } = useFormikContext<InitialValues>();
  const step = useFormSlice((state) => state.step);
  const processStep = useFormSlice((state) => state.processStep);
  const [field,meta] = useField('church');

 
  const isInvalid  = useMemo(() => {
    if (meta.touched && meta.error) {
      return true;
    } else {
      return false;
    }
  }, [meta.touched, meta.error]);

  return (
    <div className="flex flex-col w-full">
      {processStep === 1 && step === 0 ? (
        <Card className="w-full my-2 bg-green-400">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Apoyo JEBE</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Como JEBE estamos innovando y trayendo nuevos programas par este congreso que estamos por vivir. Como pasado participante de eventos de JEBE queremos que también puedas ser parte del apoyo y aporte de estas actividades de la siguiente manera:</p>

            <p className='mx-2 my-2'><strong className='font-bold'>Copa JEBE:</strong> Necesitamos de colaboradores para: Registro de inscritos y entradas compradas para el ingreso, Staff de ayuda en cancha y control del evento.</p>

            <p className='mx-2 my-2'><strong className='font-bold'>Aniversario JEBE:</strong> Necesitamos de colaboradores para: Ujieres de bienvenida, guías de invitados y apoyo para las organizaciones invitadas.</p>

            <p className='mx-2 my-2'><strong className='font-bold'>Festival Evangelistico JEBE:</strong> Necesitamos de colaboradores para: Staff de control y construcción de stands, guías de público y apoyo para las organizaciones invitadas.</p>

            <p className='mx-2 my-2'><strong className='font-bold'>Soy Voluntario JEBE:</strong> Si ya eres un voluntario JEBE, pedimos que puedas seleccionar esta opción, ya que cumples una función y labor diferente en el congreso.</p>

            <p>No deseo participar: Si no deseas ser parte de ninguna de estas actividades, agradecemos tu honestidad al seleccionar esta opción.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='font-bold text-red-800'>Si llegaste aqui sin haber participado de ninugna actividad de la, te sugerimos regresar al paso anterior</p>
          </CardFooter>
        </Card>
      ) : (
        <>
          <RadioGroup
            label="Seleccione el Congreso al que participara"
            isInvalid={isInvalid}
            errorMessage={meta.error}
            {...field}
          >
            <Radio value="buenos-aires">Copa JEBE</Radio>
            <Radio value="sydney">Aniversario JEBE</Radio>
            <Radio value="san-francisco">Festival Evangelistico JEBE</Radio>
            <Radio value="london">No deseo participar</Radio>
            <Radio value="tokyo">Soy Voluntario JEBE</Radio>
          </RadioGroup>
          <Card className="w-full my-5 bg-green-400">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">OBSERVACIÓN</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Si seleccionaste alguna de las opciones del evento, como JEBE nos estaremos comunicando directamente contigo a través del numero de Whats App que hayas dejado en este formulario de inscripción para compartirte mas información sobre tu participación como apoyo al evento seleccionado.</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <p> Si tienes preguntas extras, puedes escribirnos al número de la JEBE +593 99 047 8379 vía WhatsApp.</p>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}

export default SecondStep
