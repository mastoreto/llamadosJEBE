import React from 'react';

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

const ThirdStep:React.FC = () => {
  return (
    <div className="flex flex-col w-full">
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
    </div>
  )
}

export default ThirdStep