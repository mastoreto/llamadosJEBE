/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react'
import { useFormikContext } from 'formik';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

import { useFormSlice } from '@jebe/stores/form';

const Steps = () => {
    const processStep = useFormSlice((state) => state.processStep);
    //const step = useFormSlice((state) => state.step);
    const { submitForm, validateForm, setTouched, isValid } = useFormikContext();
    
    useEffect(() => {
        submitForm().then(() => {
            validateForm();
            setTouched({});
        });
    }
    , [isValid, setTouched, submitForm, validateForm]);
    
    return (
        <>
            {
                processStep === 0 ? <FirstStep /> : 
                processStep === 1 ? <SecondStep /> :
                processStep === 2 && <ThirdStep />
                
            }
        </>
    )
}

export default Steps;