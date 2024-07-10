import React, {useMemo } from "react";
import { useField } from "formik";
import { Input } from "@nextui-org/react";

interface FieldProps {
    type: string;
    name: string;
    props: {
        label: string;
        id: string;
        placeholder: string;
        customClassName?: string;
    };
}

const Field:React.FC<FieldProps> = ({type,name, props}) => {
  const [field, meta] = useField({name});
  const {label, id, placeholder, customClassName} = props;

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
        isInvalid={isInvalid}
        errorMessage={meta.error}
        label={label}
        {...field}
        className={`mt-2 ${customClassName}`} 
    />
  )
}

export default Field