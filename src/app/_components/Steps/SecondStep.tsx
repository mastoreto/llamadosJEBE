import React, { useState } from 'react';

import {Select, SelectItem} from "@nextui-org/select";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {RadioGroup, Radio} from "@nextui-org/react";
import CustomRadio from './Inputs/Radio'




const SecondStep = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [onLoadMore, setOnLoadMore] = useState();
  
    const [, scrollerRef] = useInfiniteScroll({
      hasMore,
      isEnabled: isOpen,
      shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
      onLoadMore,
    });

  return (
    <div className="flex flex-col w-full">
        <Select
        className="mt-2"
        isLoading={isLoading}
        items={items}
        label="Selecciona tu iglesia"
        placeholder="Ecuador"
        scrollRef={scrollerRef}
        selectionMode="single"
        onOpenChange={setIsOpen}
        >
        {(item) => (
            <SelectItem key={0} className="capitalize">
            Nothing
            </SelectItem>
        )}
        </Select>
        <RadioGroup
        label="Select your favorite city"
        >
            <Radio value="buenos-aires">Lider de Jovenes</Radio>
            <Radio value="sydney">Parte de la directiva de jóvenes de la iglesia</Radio>
            <Radio value="san-francisco">Apoyo en el ministerio de Jovenes</Radio>
            <Radio value="london">Consejero de Jóvenes</Radio>
            <Radio value="tokyo">Encargado de Jóvenes</Radio>
            <Radio value="berlin">Pastor de Jovenes</Radio>
            <Radio value="rome">No hay ministerio de jovenes en mi iglesia</Radio>
        </RadioGroup>
        <CustomRadio />
    </div>
  )
}

export default SecondStep