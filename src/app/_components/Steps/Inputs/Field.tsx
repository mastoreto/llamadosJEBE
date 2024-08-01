import React, {useMemo } from "react";
import { useField } from "formik";
import { Input } from "@nextui-org/react";

interface FieldProps {
    type: string;
    name: string;
    props: {
        isRequired?: boolean;
        label: string;
        id: string;
        placeholder: string;
        customClassName?: string;
    };
}

const Field:React.FC<FieldProps> = ({type,name, props}) => {
  const [field, meta] = useField({name});
  const {label, id, placeholder, customClassName, isRequired} = props;

  const isInvalid  = useMemo(() => {
    if (meta.touched && meta.error) {
      return true;
    } else {
      return false;
    }
  }, [meta.touched, meta.error]);
 

  return (
    <Input 
        type={type}
        id={id}
        placeholder={placeholder}
        isInvalid={isInvalid}
        isRequired={isRequired}
        errorMessage={meta.error}
        label={label}
        {...field}
        className={`mt-2 ${customClassName}`} 
    />
  )
}

export default Field