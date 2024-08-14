/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react'
import { useFormikContext } from 'formik';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import FiveStep from './FiveStep';

import { useFormSlice } from '@jebe/stores/form';
import { type InitialValues } from '@jebe/utils/types';


const Steps = () => {
    const processStep = useFormSlice((state) => state.processStep);

    const { submitForm, validateForm, setTouched, isValid, values } = useFormikContext<InitialValues>();
    
    useEffect(() => {
        try{
            const checkForm = async () => {
                await submitForm();
                if(isValid){
                    await validateForm();
                    await setTouched({});
                }  
            }  
            checkForm();
        }catch(error){
            console.log(error);
        }
    }
    , [isValid, setTouched, submitForm, validateForm]);

    
    return (
        <>
            {
                processStep === 0 ? <FirstStep /> : 
                processStep === 1 && values.congressParticipated == "si" ? <SecondStep /> :
                processStep === 2 ? <ThirdStep /> :
                processStep === 3 ? <FourthStep/> : 
                processStep === 4 && <FiveStep />  
            }
        </>
    )
}

export default Steps;