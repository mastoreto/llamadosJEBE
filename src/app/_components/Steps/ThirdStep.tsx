import React, {useMemo} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useField } from 'formik';
import { useFormSlice } from '@jebe/stores/form';

const ThirdStep: React.FC = () => {
    const step = useFormSlice((state) => state.step);
    const processStep = useFormSlice((state) => state.processStep);

    const [foodField, foodMeta] = useField({name: 'foodPackage'});
    const [hotelField, hotelMeta] = useField({name: 'hotelPackage'});

    const isInvalidFood = useMemo(() => {
        if(foodMeta.touched && foodMeta.error){
            return true;
        }
        return false;
    }, [foodMeta.error, foodMeta.touched]);

    const isInvalidHotel = useMemo(() => {
        if(hotelMeta.touched && hotelMeta.error){
            return true;
        }
        return false;
    }, [hotelMeta.error, hotelMeta.touched]);

    return (
        <div className="flex flex-col w-full">
            {processStep === 2 && step === 0 ? (
                <>
                    <Card className="w-full my-2 bg-green-400">
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-md font-bold">Metodo de Pago</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>Cada uno de los siguientes ítems que selecciones, serán agregados a tu costo final del congreso.</p>

                            <p>1) Paquete de comida para los 4 días de congreso $35</p>
                            <p>2) Hospedaje en hotel, por noche $12</p>
                        </CardBody>
                    </Card>
                    <RadioGroup
                        label="Paquete de comida Congreso"
                        {...foodField}
                        isInvalid={isInvalidFood}
                        errorMessage={foodMeta.error}
                    >
                        <Radio value="si">Si</Radio>
                        <Radio value="no">No</Radio>
                    </RadioGroup>
                    <RadioGroup
                        label="Hospedaje en Hotel"
                        {...hotelField}
                        isInvalid={isInvalidHotel}
                        errorMessage={foodMeta.error}
                    >
                        <Radio value="si">Si</Radio>
                        <Radio value="no">No</Radio>
                    </RadioGroup>
                </>
            ) : processStep === 2 && step === 1 ? (
                <Card className="w-full my-2 bg-green-400">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md font-bold">Metodo de Pago</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className='my-2'>Te mostraremos el método de pago del congreso para que puedas realizar tu adelanto de $10, o el pago completo y quedes oficialmente inscrito.</p>

                        <p className='my-2'> <span className='font-bold'>Costos:</span> $35 (Incluye: Cupo Congreso, Materiales, Final Copa JEBE, traslado interno, Entrada al Aniversario JEBE)
                                                Aumento de Costo: A partir del 1 de Septiembre, el costo subirá $10.</p>

                        <p className='my-2'>NO INCLUYE TRANSPORTE EL PAGO.</p>

                        <p className='my-2'><span className='font-bold'>Reserva:</span> Con $10 puedes separar tu cupo y el restante puede ser pagado el día inicio del congreso. IMPORTANTE: Estos $10 de reserva no podrán ser reembolsables desde el 30 de Septiembre.</p>

                        <p className='my-2 font-bold'>Transferencia Bancaria:</p>

                        <p className='font-bold'>Banco Pichincha</p>
                        <p>Cuenta de ahorro</p>
                        <p>Número: 2210655306</p>
                        <p>Daniela Rocha</p>
                        <p>C.I: 1751880335</p>


                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <p>
                            <span className='font-bold'>ENVIAR COMPROBANTE:</span> Todo comprobante debe ser enviado al número oficial de la JEBE +593990478379 vía WhatsApp y al correo jebecuador@gmail.com, caso contrario no tendrá validez su reserva.
                                                </p>
                    </CardFooter>
                </Card>
            ) : null}
        </div>
    );
}

export default ThirdStep;
