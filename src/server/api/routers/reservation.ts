/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@jebe/server/api/trpc";
import { UserService } from "@jebe/server/api/service/User.service";
import { ReservationService } from "@jebe/server/api/service/Reservation.service";
import { PaymentService } from "@jebe/server/api/service/Payments.service";
import Role from "@jebe/server/Enums/Role.enum";

// Instanciar los servicios
const userService = new UserService();
const reservationService = new ReservationService();
const paymentService = new PaymentService();

export const reservationRouter = createTRPCRouter({
  createReservation: publicProcedure
    .input(z.object({
      identificationCard: z.string(),
      email: z.string().email(),
      firstname: z.string(),
      lastname: z.string(),
      birthDay: z.string(),
      cellphone: z.string(),
      contact: z.string(),
      discopat: z.string(),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      church: z.string(),
      areas: z.string(),
      recurrentParticipant: z.string(),
      congressParticipated: z.string(),
      foodPackage: z.string(),
      hotelPackage: z.string(),
    }))
    .mutation(async ({ input }) => {
      let errorMessage = "";
      
      try {
        let user = await userService.getUserById(BigInt(input.identificationCard));

        if (!user) {
         errorMessage = "No se pudo crear el usuario";
         user = await userService.createUser({
            userId: BigInt(input.identificationCard),
            email: input.email,
            userName: input.firstname,
            userSurname: input.lastname,
            userDateOfBirthday: input.birthDay,
            userCivilStatusId: BigInt(1), // Placeholder; reemplazar con lógica real
            userSexId: BigInt(1), // Placeholder; reemplazar con lógica real
            userChurchId: BigInt(input.church), // Placeholder; reemplazar con lógica real
            userResidenceStateId: BigInt(input.state), // Placeholder; reemplazar con lógica real
            userRoleId: BigInt(Role.Participant), // Placeholder; reemplazar con lógica real
            userPassword: "securepassword", // Hashear antes de almacenar
          });
        }

        // Crear la reserva
        errorMessage = "No se pudo crear la reserva";
        const reservation = await reservationService.createReservation({
          userId: user.userId,
          dateTimeEntry: new Date(),
          dateTimeDeparture: new Date(),
          accomodationTypeId: BigInt(1),
          statusId: BigInt(1),
          expirationDay: new Date(), 
          lastPayment: new Date(),
          depositAmount: 30,
          amount: 30,
          additionalAttributes: [
            { key: "discopat", value: input.discopat },
            { key: "city", value: input.city },
            { key: "church", value: input.church },
            { key: "areas", value: input.areas },
            { key: "recurrentParticipant", value: input.recurrentParticipant },
            { key: "congressParticipated", value: input.congressParticipated },
            { key: "foodPackage", value: input.foodPackage },
            { key: "hotelPackage", value: input.hotelPackage },
          ],
        });

        errorMessage = "No se pudo crear el pago";
        const payment = await paymentService.createPayment({
            reservationId: reservation.reservation_id,
            userId: user.userId,
            paymentMethodId: BigInt(1),
            paymentStatusId: BigInt(1),
            paymentTypeId: BigInt(1),
            paymentDescription: "Pago de congreso",
            paymentAmount: 30
            });

        return {
          user,
          reservation,
          payment,
        };
        
      } catch (error) {
        console.error("Error en el procedimiento: ", errorMessage);
        console.error("Error al crear la reserva:", error);
        throw new Error("No se pudo crear la reserva");
      }
    }),
});
