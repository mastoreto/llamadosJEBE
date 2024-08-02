import type { CalendarDate } from "@internationalized/date";

export type SelectData = {
    id: number;
    name: string;
}

export type InitialValues = {
    identificationCard: string;
    email: string;
    firstname: string;
    lastname: string;
    birthDay: CalendarDate;
    cellphone: string;
    discopat: string;
    contact: string;
    country: string;
    state: string;
    city: string;
    church: string;
    areas: string;
    recurrentParticipant: string;
    congressParticipated: string;
    foodPackage: string;
    hotelPackage: string;
}