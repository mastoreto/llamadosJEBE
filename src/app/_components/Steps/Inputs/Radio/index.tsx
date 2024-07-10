import React from 'react'
import { RadioGroup } from '@nextui-org/react'
import { CustomRadio } from './CustomRadio'
const index = () => {
  return (
    <RadioGroup 
        label="Plans"
        orientation='horizontal'
        size='lg'
        className='w-full mt-2 mx-2'
    >
        <CustomRadio description="Up to 20 items" value="free">
            Free
        </CustomRadio>
        <CustomRadio description="Unlimited items. $10 per month." value="pro">
            Pro
        </CustomRadio>
        <CustomRadio
            description="24/7 support. Contact us for pricing."
            value="enterprise"
        >
            Enterprise
        </CustomRadio>
  </RadioGroup>
  )
}

export default index