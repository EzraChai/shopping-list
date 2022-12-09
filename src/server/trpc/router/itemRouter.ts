import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const itemRouter = router({
  addItem: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const item = await ctx.prisma.shoppingItem.create({
        data: {
          name,
        },
      });
      return item;
    }),
  getAllItems: publicProcedure.query(async ({ ctx }) => {
    const items = ctx.prisma.shoppingItem.findMany();
    return items;
  }),
});
