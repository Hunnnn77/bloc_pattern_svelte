import { z } from "zod";

export const ResponseDataSchema = z.object({
  ok: z.boolean(),
});

export type ResponseData = z.infer<typeof ResponseDataSchema>;
