import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/button";
import FirstStep from "./_components/Steps/FirstStep";

const page = () => {
  return (
    <section className='flex flex-row w-full'>
      <div className='w-1/2 h-full p-5 flex justify-center items-center'>
        <Card fullWidth>
          <CardHeader>
            <h2>Llamados</h2>
          </CardHeader>
          <CardBody>
            <FirstStep />
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button>Anterior</Button>
              <Button>Siguiente</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
      <div className='w-1/2 h-full'></div>
    </section>
  )
}

export default page