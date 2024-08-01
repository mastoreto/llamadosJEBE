/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@jebe/server/api/trpc";

export const countriesRouter = createTRPCRouter({
  getAll: publicProcedure.query( async ({ctx}) => {
    const countries = await ctx.db.country.findMany({
      orderBy: {
        country_name: 'asc'
      }
    });
    return countries;
   }),
});
