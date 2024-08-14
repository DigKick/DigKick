import { z } from 'zod';

export const propertySchema = z.object({
  digkick: z
    .object({
      banner: z.boolean().default(true),
    })
    .optional(),

  mqtt: z.object({
    login: z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }),
    host: z.string().min(1),
  }),

  db: z.object({
    source: z.object({
      database: z.object({
        name: z.string().min(1),
        suffix: z.string().min(1),
      }),
    }),
  }),

  player: z
    .object({
      name: z
        .object({
          restrictions: z
            .object({
              length: z
                .object({
                  min: z
                    .number()
                    .positive({
                      message: 'Min player name length must be greater than 0!',
                    })
                    .optional()
                    .default(3),
                  max: z
                    .number()
                    .positive({
                      message: 'Max player name length must be greater than 0!',
                    })
                    .optional()
                    .default(12),
                })
                .optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
});
