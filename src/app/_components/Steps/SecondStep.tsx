import React, { useState } from 'react';

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { RadioGroup, Radio } from "@nextui-org/react";

import { useFormSlice } from '@jebe/stores/form';

const SecondStep = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [onLoadMore, setOnLoadMore] = useState();

  const step = useFormSlice((state) => state.step);
  const processStep = useFormSlice((state) => state.processStep);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  })

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
          <Select
            className="mt-2"
            isLoading={isLoading}
            items={items}
            label="Selecciona tu iglesia"
            placeholder="Ecuador"
            scrollRef={scrollerRef}
            selectionMode="single"
            onOpenChange={setIsOpen}
          >
            {(item) => (
              <SelectItem key={0} className="capitalize">
                Nothing
              </SelectItem>
            )}
          </Select>
          <RadioGroup
            label="Seleccione el Congreso al que participara"
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
