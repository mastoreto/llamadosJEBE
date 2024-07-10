/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react'

import {Button, ButtonGroup} from "@nextui-org/button";

import { useFormSlice } from '@jebe/stores/form';

const Controls = () => {
    const processStep = useFormSlice((state) => state.processStep);
    const nextStep = useFormSlice((state) => state.nextStep);
    const prevStep = useFormSlice((state) => state.prevStep);

    const handleNextStep = () => {
        nextStep();
    }

    const handlePrevStep = () => {
        prevStep();
    }

  return (
    <ButtonGroup className='w-full'>
        <Button color="warning" className='w-1/2' onClick={() => handlePrevStep()}>Anterior</Button>
        <Button color="warning" className='w-1/2' onClick={() => handleNextStep()}>Siguiente</Button>
    </ButtonGroup>
  )
}

export default Controls;