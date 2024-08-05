"use client";
import React, { useMemo } from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { useField } from 'formik';

import type { SelectData } from '@jebe/utils/types';

interface FieldSelectProps {
    label: string;
    name: string;
    defaultValue?: string[];
    isLoading: boolean;
    items: Array<SelectData>;
    isRequired?: boolean;
}


const FieldSelect: React.FC<FieldSelectProps> = ({ name, isLoading, items, label, defaultValue, isRequired }) => {
  const [field,meta] = useField({name});
  
  const isInvalid  = useMemo(() => {
    if (meta.touched && meta.error) {
      return true;
    } else {
      return false;
    }
  }, [meta.touched, meta.error]);

  return (
    <Select
    items={items}
    isLoading={isLoading}
    isInvalid={isInvalid}
    label={label}
    defaultSelectedKeys={defaultValue}
    selectionMode="single"
    {...field}
    isRequired={isRequired}
    className="mt-2"
  >
    {(item: SelectData) => (
      <SelectItem key={Number(item?.id)} className="capitalize">
        {item?.name}
      </SelectItem>
    )}
  </Select>
  )
}

export default FieldSelect;