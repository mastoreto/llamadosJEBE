/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@jebe/server/api/trpc";

export const churchesRouter = createTRPCRouter({
  getAll: publicProcedure
  .input(z.object({
    state_id: z.number()
  })).
  query( async ({ctx, input}) => {
    const { state_id } = input;
    const churches = await ctx.db.church.findMany({
      where: {
        church_state_id: state_id
      },
      orderBy: {
        church_name: 'asc'
      }
    });
    return churches;
   }),
});
