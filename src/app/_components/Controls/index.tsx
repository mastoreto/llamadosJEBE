/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import {Button, ButtonGroup} from "@nextui-org/button";
import { useFormikContext } from 'formik';
import { useFormSlice } from '@jebe/stores/form';
import type { InitialValues } from '@jebe/utils/types';
import {getNumberOfSubSteps, numberOfSteps} from '@jebe/utils/validations';

const Controls = () => {
    const step = useFormSlice((state) => state.step);
    const processStep = useFormSlice((state) => state.processStep);
    const nextProcessStep = useFormSlice((state) => state.nextProcessStep);
    const prevProcessStep = useFormSlice((state) => state.prevProcessStep);
    const nextStep = useFormSlice((state) => state.nextStep);
    const prevStep = useFormSlice((state) => state.prevStep);
    const setStep = useFormSlice((state) => state.setStep);
    const setProcessStep = useFormSlice((state) => state.setProcessStep);
    const { submitForm, validateForm, setTouched, isValid, values } = useFormikContext<InitialValues>();

    useEffect(() => {
      submitForm().then(() => {
        validateForm();
        setTouched({});
      });
      
    }, [isValid, setTouched, submitForm, validateForm, processStep, step]);

    const handleSubmit = async (): Promise<void> => {
      try{
        await submitForm();
        if(isValid){
          await validateForm();
          await setTouched({});
          nextProcessStep();
        }
      }
      catch(error){
        console.log(error)
      }
    }

    const handleNextStep = async (): Promise<void> => {
      try{
        if(step == getNumberOfSubSteps(processStep)-1){
         await submitForm();
         console.log(isValid);
         if(isValid){
           await validateForm();
           await setTouched({});
           
           if(values.recurrentParticipant == "no" && processStep == 0){
              setProcessStep(2);
           }else{
              nextProcessStep();
           }
           setStep(0);
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
        if(processStep > 0 && step == 0){
            if(values.recurrentParticipant == "no" && processStep == 2){
              setProcessStep(0);
            }else{
              prevProcessStep();
            }
            setStep(getNumberOfSubSteps(processStep-1)-1);
        }else if(step > 0){ 
            prevStep();
        }
    }

  return processStep !== numberOfSteps && (
    <ButtonGroup className='w-full'>
        {
          (processStep > 0 || step > 0) && (<Button color="warning" className='w-1/2' onClick={() => handlePrevStep()}>Anterior</Button>)
        }
        {
          processStep  == numberOfSteps-2 ? (<Button color="success" className='w-1/2' onClick={() => handleSubmit()}>Confirmar</Button>) : (<Button color="warning" className={`${(processStep > 0 || step > 0) ? 'w-1/2' : 'w-full'}`} onClick={() => handleNextStep()}>Siguiente</Button>)
        }
    </ButtonGroup>
  )
}

export default Controls;