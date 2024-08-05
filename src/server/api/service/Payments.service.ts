import { PrismaClient, Prisma, Payment } from '@prisma/client';

// Inicializar el cliente de Prisma
const prisma = new PrismaClient();

export class PaymentService  {
  // Crear un nuevo pago
  async createPayment(data: {
    reservationId: bigint;
    userId: bigint;
    paymentMethodId: bigint;
    paymentStatusId: bigint;
    paymentTypeId: bigint;
    paymentDescription: string;
    paymentAmount: number;
  }): Promise<Payment> {
    try {
      const payment = await prisma.payment.create({
        data: {
          payment_method_id: data.paymentMethodId,
          payment_status_id: data.paymentStatusId,
          payment_type_id: data.paymentTypeId,
          payment_description: data.paymentDescription,
          payment_amount: data.paymentAmount,
          payment_creation_date: new Date(), // Fecha actual
        },
      });

      const reservationGeneratePayment = await prisma.reservationGeneratePayment.create({
        data: {
          reservation_id: data.reservationId,
          payment_id: payment.payment_id,
          payment_user_id: data.userId, // Replace with the actual value
        },
      });

      if (!reservationGeneratePayment) {
        throw new Error('No se pudo generar el pago para la reserva');
    }


      return payment;
    } catch (error: any) {
      console.error('Error creating payment:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Manejo de errores específicos de Prisma
        if (error.code === 'P2002') {
          throw new Error('Un pago con estos datos ya existe.');
        }
      }
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  // Obtener un pago por ID
  async getPaymentById(paymentId: bigint): Promise<Payment | null> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { payment_id: paymentId },
        include: {
          paymentType: true,
          paymentStatus: true,
          paymentMethod: true,
          reservationGeneratePayment: true,
        },
      });
      return payment;
    } catch (error: any) {
      console.error('Error retrieving payment:', error);
      throw new Error(`Error retrieving payment: ${error.message}`);
    }
  }

  // Actualizar un pago por ID
  async updatePayment(
    paymentId: bigint,
    data: {
      paymentMethodId?: bigint;
      paymentStatusId?: bigint;
      paymentTypeId?: bigint;
      paymentDescription?: string;
      paymentAmount?: number;
    }
  ): Promise<Payment> {
    try {
      const updatedPayment = await prisma.payment.update({
        where: { payment_id: paymentId },
        data: {
          payment_method_id: data.paymentMethodId,
          payment_status_id: data.paymentStatusId,
          payment_type_id: data.paymentTypeId,
          payment_description: data.paymentDescription,
          payment_amount: data.paymentAmount,
        },
      });
      return updatedPayment;
    } catch (error: any) {
      console.error('Error updating payment:', error);
      throw new Error(`Error updating payment: ${error.message}`);
    }
  }

  // Eliminar un pago por ID
  async deletePayment(paymentId: bigint): Promise<Payment> {
    try {
      const deletedPayment = await prisma.payment.delete({
        where: { payment_id: paymentId },
      });
      return deletedPayment;
    } catch (error: any) {
      console.error('Error deleting payment:', error);
      throw new Error(`Error deleting payment: ${error.message}`);
    }
  }

  // Listar todos los pagos
  async listPayments(): Promise<Payment[]> {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          paymentType: true,
          paymentStatus: true,
          paymentMethod: true,
          reservationGeneratePayment: true,
        },
      });
      return payments;
    } catch (error: any) {
      console.error('Error listing payments:', error);
      throw new Error(`Error listing payments: ${error.message}`);
    }
  }
};
