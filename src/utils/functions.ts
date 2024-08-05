import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const formatDatePostgres = (fechaEntrada: string) =>  {
    dayjs.extend(utc);
    const fecha = dayjs(fechaEntrada);
    
    const fechaFormateada = fecha.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return fechaFormateada;
}