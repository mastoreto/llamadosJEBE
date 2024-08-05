import { PrismaClient, Prisma } from '@prisma/client';
import { formatDatePostgres } from '@jebe/utils/functions';

const prisma = new PrismaClient();

import { env } from "@jebe/env";

export interface CreateReservationInput {
  userId: bigint;
  dateTimeEntry: Date;
  dateTimeDeparture: Date;
  accomodationTypeId: bigint;
  statusId: bigint;
  expirationDay: Date;
  lastPayment: Date;
  depositAmount: number;
  amount: number;
  additionalAttributes?: Array<{ key: string; value: string }>;
}

export class ReservationService {

  public async createReservation(input: CreateReservationInput) {
    try {
      const reservation = await prisma.reservation.create({
        data: {
          reservation_userId: input.userId,
          reservation_event_id: BigInt(env.EVENT_ID),
          reservation_date_time_entry: formatDatePostgres(input.dateTimeEntry.toISOString()),
          reservation_date_time_departure: formatDatePostgres(input.dateTimeDeparture.toISOString()),
          reservation_accomodation_type_id: (input.accomodationTypeId),
          reservation_status_id: input.statusId,
          reservation_expiration_day: formatDatePostgres(input.expirationDay.toISOString()),
          reservation_last_payment: formatDatePostgres(input.lastPayment.toISOString()),
          reservation_deposit_amount: input.depositAmount,
          reservation_amount: input.amount,
          AdditionalAttribute: {
            create: input.additionalAttributes?.map(attr => ({
              attribute_key: attr.key,
              value: attr.value,
            })),
          },
        },
      });

      return reservation;
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      throw new Error('No se pudo crear la reserva');
    }
  }

  // Método para obtener una reserva por ID
  public async getReservationById(reservationId: bigint) {
    try {
      const reservation = await prisma.reservation.findUnique({
        where: { reservation_id: reservationId },
        include: {
          AdditionalAttribute: true, // Incluye los atributos adicionales
        },
      });

      if (!reservation) {
        throw new Error('Reserva no encontrada');
      }

      return reservation;
    } catch (error) {
      console.error('Error al obtener la reserva:', error);
      throw new Error('No se pudo obtener la reserva');
    }
  }
}
