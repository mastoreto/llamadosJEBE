/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { useState } from "react";
import Field from '../Inputs/Field';
import { Input } from "@nextui-org/react";
import { DateInput } from "@nextui-org/date-input";
import { CalendarDate } from "@internationalized/date";
import { Select, SelectSection, SelectItem, type Selection } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { api } from "@jebe/trpc/react";
import { useFormSlice } from '@jebe/stores/form';


const FirstStep = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [onLoadMore, setOnLoadMore] = useState();
  const [values, setValues] = useState<Selection>(new Set([]));
  const [radioJebe, setRadioJebe] = useState<string | null>(null);
  const {
    data: states,
    isLoading: isLoadingStates,
    isFetching: isFetchingStates,
  } = api.states.getAll.useQuery();

  const step = useFormSlice((state) => state.step);
  const processStep = useFormSlice((state) => state.processStep);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  return (
    <div className="flex flex-col w-full">
      {processStep === 0 && step === 0 ? (
        <>
          <Field
            type="number"
            name="cedula"
            props={{
              label: "Cédula",
              id: "cedula",
              placeholder: "Cédula"
            }}
          />
          <Field
            type="email"
            name="email"
            props={{
              label: "Email",
              id: "email",
              placeholder: "email"
            }}
          />
          <div className="flex flex-row justify-between w-full mt-2">
            <Field
              type="text"
              name="nombre"
              props={{
                label: "Nombre",
                id: "name",
                placeholder: "Nombre"
              }}
            />
            <Field
              type="apellido"
              name="apellido"
              props={{
                label: "Apellido",
                id: "apellido",
                placeholder: "apellido",
                customClassName: "ml-2"
              }}
            />
          </div>
          <DateInput label={"Fecha de nacimiento"} placeholderValue={new CalendarDate(1995, 11, 6)} className="mt-2" />
          <Input type="number" label="Celular" className="mt-2" />
          <Field
            type="number"
            name="contacto"
            props={{
              label: "Contacto de emergencia",
              id: "contacto",
              placeholder: "Contacto de Emergencia"
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
          <Select
            className="mt-2"
            isLoading={isLoading}
            items={items}
            label="Selecciona tu País"
            placeholder="Ecuador"
            scrollRef={scrollerRef}
            selectionMode="single"
            onOpenChange={setIsOpen}
          >
            {(item) => (
              <SelectItem key={Number(item.state_id)} className="capitalize">
                {item.state_name}
              </SelectItem>
            )}
          </Select>
          <Select
            label="Selecciona tu provincia"
            className="mt-2"
          >
            <SelectSection title="Costa">
              <SelectItem key="1">Item 1</SelectItem>
            </SelectSection>
          </Select>
          <Select
            label="Selecciona tu ciudad"
            className="mt-2"
          >
            <SelectSection title="Costa">
              <SelectItem key="1">Item 1</SelectItem>
            </SelectSection>
          </Select>
          <Select
            label="Selecciona tu iglesia"
            className="mt-2"
          >
            <SelectSection title="Costa">
              <SelectItem key="1">Item 1</SelectItem>
            </SelectSection>
          </Select>
        </>
      ) : processStep === 0 && step === 2 && (
        <>
          
          <Select
            label="¿En que área o áreas de servicio te desarrollas?"
            className="mt-2"
            selectionMode="multiple"
            selectedKeys={values}
            onSelectionChange={setValues}
          >
            <SelectSection title="Costa">
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
            </SelectSection>
          </Select>
          <RadioGroup
            label="Haz participado antes de un congreso de la JEBE"
            value={radioJebe}
            onChange={(e) => setRadioJebe(e.target.value)}
          >
            <Radio value="sí">Sí</Radio>
            <Radio value="No">No</Radio>
          </RadioGroup>
         {radioJebe === 'sí' && (
           <CheckboxGroup
           label="¿Si tú respuesta fue si, de que congreso participaste?"
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
