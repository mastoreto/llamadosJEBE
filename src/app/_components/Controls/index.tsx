/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import {Button, ButtonGroup} from "@nextui-org/button";
import { useFormikContext } from 'formik';
import { useFormSlice } from '@jebe/stores/form';
import {getNumberOfSubSteps, schemeValidation, numberOfSteps} from '@jebe/utils/validations';

const Controls = () => {
    const step = useFormSlice((state) => state.step);
    const processStep = useFormSlice((state) => state.processStep);
    const nextProcessStep = useFormSlice((state) => state.nextProcessStep);
    const prevProcessStep = useFormSlice((state) => state.prevProcessStep);
    const nextStep = useFormSlice((state) => state.nextStep);
    const prevStep = useFormSlice((state) => state.prevStep);
    const { submitForm, validateForm, setTouched, isValid, values } = useFormikContext();

    useEffect(() => {
      submitForm().then(() => {
        validateForm();
        setTouched({});
      });
    }, [isValid, setTouched, submitForm, validateForm, processStep, step]);

    const handleNextStep = async (): Promise<void> => {
      try{
        if(getNumberOfSubSteps(processStep) === step){
         await submitForm();
         if(isValid){
           await validateForm();
           await setTouched({});
           nextProcessStep();
         }
        }else{
          await submitForm();
          if(isValid){
            await validateForm();
            await setTouched({});
            nextStep();
          }
        }
        console.log(values);
      }
      catch(error){
        console.log(error)
      }
    }

    const handlePrevStep = () => {
       console.log(processStep > 0 && step >= 0)
        if(processStep > 0 && step == 0){
            prevProcessStep();
        }else if(step > 0){ 
            prevStep();
        }
    }

  return (
    <ButtonGroup className='w-full'>
        {
          (processStep > 0 || step > 0) && (<Button color="warning" className='w-1/2' onClick={() => handlePrevStep()}>Anterior</Button>)
        }
        <Button color="warning" className={`${(processStep > 0 || step > 0) ? 'w-1/2' : 'w-full'}`} onClick={() => handleNextStep()}>Siguiente</Button>
    </ButtonGroup>
  )
}

export default Controls;