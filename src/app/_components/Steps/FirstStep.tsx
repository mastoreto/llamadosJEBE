"use client";
import {Input} from "@nextui-org/react";
import {DateInput} from "@nextui-org/date-input";
import {CalendarDate} from "@internationalized/date";

const FirstStep = () => {

  return (
    <div className="flex flex-col w-full">
        <Input type="number" placeholder="Cédula" className="my-2" />
        <div className="flex flex-row justify-between w-full">
            <Input type="text" placeholder="Nombre" className="mr-2" />
            <Input type="text" placeholder="Apellido" />
        </div>
        <Input type="text" placeholder="Nombre" />
        <DateInput  label={"Fecha de nacimiento"} placeholderValue={new CalendarDate(1995, 11, 6)} />
        <Input type="number" placeholder="Celular" />

    </div>
  )

}

export default FirstStep;