import { z } from 'zod'

export const projectFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome do projeto é obrigatório.' }),
  description: z.string().optional(),
  model: z.object({
    id: z.string().min(1, { message: 'O modelo do projeto é obrigatório.' }),
    name: z.string().min(1, { message: 'O modelo do projeto é obrigatório.' }),
  }),
  active: z.boolean(),
})

export type ProjectForm = z.infer<typeof projectFormSchema>
