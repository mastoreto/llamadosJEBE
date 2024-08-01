/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@jebe/server/api/trpc";

export const statesRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.object({
    id: z.string()
  })).
  query(async ({ctx, input}) => {
    const { id } = input;
    const countries = await ctx.db.state.findMany({
      where: {
        state_country_id: BigInt(id)
      },
      orderBy: {
        state_name: 'asc'
      }
    });
    return countries;
   }),
});
