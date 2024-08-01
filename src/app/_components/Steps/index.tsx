/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react'
import { useFormikContext } from 'formik';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

import { useFormSlice } from '@jebe/stores/form';

const Steps = () => {
    const processStep = useFormSlice((state) => state.processStep);

    const { submitForm, validateForm, setTouched, isValid } = useFormikContext();
    
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
                processStep === 1 ? <SecondStep /> :
                processStep === 2 ? <ThirdStep /> :
                processStep === 3 ? <FourthStep/> : null  
            }
        </>
    )
}

export default Steps;