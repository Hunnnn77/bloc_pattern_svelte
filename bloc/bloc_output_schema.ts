import { z } from "zod";

export interface IModels {
  user: ResponseData;
}
export const ResponseDataSchema = z.object({
  ok: z.boolean(),
});

type ResponseData = z.infer<typeof ResponseDataSchema>;
