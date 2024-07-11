/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import {useState} from "react";
import Field from '../Steps/Inputs/Field';
import {Input} from "@nextui-org/react";
import {DateInput} from "@nextui-org/date-input";
import {CalendarDate} from "@internationalized/date";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import { api } from "@jebe/trpc/react";

const FirstStep = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [onLoadMore, setOnLoadMore] = useState();

  const {
    data: states,
    isLoading: isLoadingStates,
    isFetching: isFetchingStates,
  } = api.states.getAll.useQuery(); 

  console.log(states);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  return (
    <div className="flex flex-col w-full">
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
            customClassName:"ml-2"
          }}
         
          />
        </div>
        <DateInput  label={"Fecha de nacimiento"} placeholderValue={new CalendarDate(1995, 11, 6)} className="mt-2"/>
        <Input type="number" label="Celular" className="mt-2"/>
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
   
    </div>
  )

}

export default FirstStep;