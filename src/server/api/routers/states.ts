import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@jebe/server/api/trpc";

export const statesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ctx}) => {
    return ctx.db.state.findMany();
   }),
});
