/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import React, { useMemo, useState } from 'react';
import { DateInput } from "@nextui-org/date-input";
import { CalendarDate, parseDate, type DateValue } from "@internationalized/date";
import { useField, useFormikContext } from 'formik';
import { set } from 'zod';

interface FieldDateProps {
    name: string;
    props: {
        label: string;
        id: string;
        placeholder: string;
        isRequired?: boolean;
    }
}

const FieldDate: React.FC<FieldDateProps> = ({name, props}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField({name});
    const [value, setValue] = useState<DateValue>(new CalendarDate(1997, 5, 25));

    const {label, id, isRequired} = props;

    const isInvalid  = useMemo(() => {
        if (meta.touched && meta.error) {
          return true;
        } else {
          return false;
        }
      }, [meta.touched, meta.error]);

      const onChange = async (e: DateValue) => {
        const date = e.year + "-" + e.month + "-" + e.day;
        setValue(e);
        await setFieldValue(field.name, date);
      }


  return (
      <DateInput 
          id={id}
          name={field.name}
          label={label} 
          defaultValue={value}
          isInvalid={isInvalid}
          isRequired={isRequired}
          errorMessage={meta.error}
          onChange={(e) => onChange(e)}
          value={value}
          className="mt-2" 
      />
  )
}

export default FieldDate;