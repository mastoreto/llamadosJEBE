/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { useState, useMemo, SetStateAction } from "react";
import Field from '../Inputs/Field';
import FieldDate from '../Inputs/FieldDate';
import FieldSelect from "../Inputs/FieldSelect";
import { Select, SelectSection, SelectItem, type Selection } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useFormikContext, useField } from "formik";
import { api } from "@jebe/trpc/react";

import type { InitialValues } from '@jebe/utils/types';

import { useFormSlice } from '@jebe/stores/form';
import { m } from "framer-motion";

const FirstStep = () => {
  const [value, setValues] = useState<Selection>(new Set([]));
  const [radioJebe, setRadioJebe] = useState<string | null>(null);
  const [checkboxJebe, setCheckboxJebe] = useState([]);
  const { values, setFieldValue } = useFormikContext<InitialValues>();
  const [field,meta] = useField({name: 'areas'});
  const [fieldRadio,metaRadio] = useField({name: 'recurrentParticipant'});
  const [fieldCheckbox,metaCheckbox] = useField({name: 'congressParticipated'});

  const {
    data: countries,
    isLoading: isLoadingCountries,
    isFetching: isFetchingCountries,
  } = api.countries.getAll.useQuery();

  const {
    data: states,
    isLoading: isLoadingStates,
    isFetching: isFetchingStates,
  } = api.states.getAll.useQuery({
    id: values?.country ?? 0,
  });

  const {
    data: churches,
    isLoading: isLoadingChurches,
    isFetching: isFetchingChurches,
  } = api.churches.getAll.useQuery({
    state_id: Number(values?.state) ?? 0,
  });


  const step = useFormSlice((state) => state.step);
  const processStep = useFormSlice((state) => state.processStep);


  const onChangeSelect = async (e: Selection) => {
    setValues(e);
    
    await setFieldValue('areas',values);
    console.log(values)
  };

  const onChangeRadio = async (value: string) => {
    setRadioJebe(value);
    await setFieldValue('recurrentParticipant',value);
  }

  const onChangeCheckbox = async (e: SetStateAction<never[]>) => {
    setCheckboxJebe(e);
    await setFieldValue('congressParticipated',e);
  }

  const isInvalidAreas = useMemo(() => {
    if(meta.error && meta.touched){
      return true;
    }else{
      return false;
    }
  },[meta.error,meta.touched]);

  const isInvalidRadio = useMemo(() => {
    if(metaRadio.error && metaRadio.touched){
      return true;
    }else{
      return false;
    }
  },[metaRadio.error,metaRadio.touched]);

  const isInvalidCheckbox = useMemo(() => {
    if(metaCheckbox.error && metaCheckbox.touched){
      return true;
    }else{
      return false;
    }
  },[metaCheckbox.error,metaCheckbox.touched]);



  return (
    <div className="flex flex-col w-full">
      {processStep === 0 && step === 0 ? (
        <>
          <Field
            type="number"
            name="identificationCard"
            props={{
              label: "Cédula",
              id: "identificationCard",
              placeholder: "Cédula",
              isRequired: true
            }}
          />
          <Field
            type="email"
            name="email"
            props={{
              label: "Email",
              id: "email",
              placeholder: "email",
              isRequired: true
            }}
          />
          <div className="flex flex-row justify-between w-full mt-2">
            <Field
              type="text"
              name="firstname"
              props={{
                label: "Nombre",
                id: "firstname",
                placeholder: "Nombre",
                isRequired: true
              }}
            />
            <Field
              type="apellido"
              name="lastname"
              props={{
                label: "Apellido",
                id: "lastname",
                placeholder: "apellido",
                customClassName: "ml-2",
                isRequired: true
              }}
            />
          </div>
          <FieldDate 
            name="birthDay"
            props={{
              label: "Fecha de nacimiento",
              id: "birthDay",
              placeholder: "Fecha de nacimiento"
            }}
          />
          <Field 
            name="cellphone"
            type="number" 
            props={{
              label: "Celular",
              id: "cellphone",
              placeholder: "Celular"
            }}
          />
          <Field
            type="number"
            name="contact"
            props={{
              label: "Contacto de emergencia",
              id: "contact",
              placeholder: "Contacto de Emergencia",
              isRequired: true
              
            }} />
          <Field
            type="text"
            name="discopat"
            props={{
              label: "Enfermedad o discapacidad",
              id: "discopat",
              placeholder: "Enfermedad o discapacidad"
            }} />
        </>
      ) : processStep === 0 && step === 1 ? (
        <>
         <FieldSelect
            name="country"
            isLoading={isLoadingCountries}
            label="Selecciona tu País"
            defaultValue={values?.country}
            isRequired={true}
            items={
              countries?.map((country) => ({
                id: Number(country.country_id),
                name: country.country_name
              })) ?? []
            }
          />
           <FieldSelect
            name="state"
            isLoading={isLoadingCountries}
            isRequired={true}
            label="Selecciona tu provincia"
            items={
              states?.map((state) => ({
                id: Number(state.state_id),
                name: state.state_name
              })) ?? []
            }
          />
          <Field
            type="text"
            name="city"
            props={{
              label: "Ciudad",
              id: "city",
              placeholder: "Ciudad",
              isRequired: true
            }}
          />
          </>
      ) : processStep === 0 && step === 2 && (
        <>
           <FieldSelect
            name="church"
            isLoading={isLoadingChurches}
            label="Selecciona tu iglesia"
            isRequired={true}
            items={
              churches?.map((church) => ({
                id: Number(church.church_id),
                name: church.church_name
              })) ?? []
            }
          />
          <Select
            label="¿En que área o áreas de servicio te desarrollas?"
            className="mt-2"
            selectionMode="multiple"
            {...field}
            selectedKeys={value}
            isInvalid={isInvalidAreas}
            errorMessage={meta.error}
            onSelectionChange={(e) => onChangeSelect(e)}
          >
              <SelectItem key="oración">Oración</SelectItem>
              <SelectItem key="jóvenes">Jóvenes</SelectItem>
              <SelectItem key="dicipulado">Discipulado</SelectItem>
              <SelectItem key="multimedia">Multimedia</SelectItem>
              <SelectItem key="alabanza">Alabanza</SelectItem>
              <SelectItem key="logística">Logística</SelectItem>
              <SelectItem key="redesSociales">Redes Sociales</SelectItem>
              <SelectItem key="artes">Artes</SelectItem>
              <SelectItem key="niños">Niños</SelectItem>
              <SelectItem key="otros">Otros</SelectItem>
          </Select>
          <RadioGroup
            label="Haz participado antes de un congreso de la JEBE"
            {...fieldRadio}
            value={radioJebe}
            onChange={(e) => onChangeRadio(e.target.value)}
            isInvalid={isInvalidRadio}
            errorMessage={metaRadio.error}
          >
            <Radio value="sí">Sí</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
         {radioJebe === 'sí' && (
          <CheckboxGroup
           label="¿Si tú respuesta fue si, de que congreso participaste?"
            {...fieldCheckbox}
            onChange={onChangeCheckbox}
            value={checkboxJebe}
            isInvalid={isInvalidCheckbox}
            errorMessage={metaCheckbox.error}
          >
            <Checkbox value="regionales2024">Congresos Regionales 2024</Checkbox>
            <Checkbox value="SomosJebe">#SomosJEBE</Checkbox>
            <Checkbox value="Yendo">Congreso Internacional YENDO</Checkbox>
            <Checkbox value="congreso2022">Congresos del 2022</Checkbox>
            <Checkbox value="congreso2021">Congresos 2021</Checkbox>
            <Checkbox value="noParticipo">No he participado antes de la JEBE</Checkbox>
          </CheckboxGroup>
          )}
        </>
      )}
    </div>
  )
}

export default FirstStep;
