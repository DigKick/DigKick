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
    host: z.string().min(1).default("localhost"),
    port: z.number().default(1883),
    protocol: z.union([z.literal('mqtt'), z.literal('mqtts')]).default("mqtt"),
  }),

  db: z.object({
    source: z.object({
      database: z.string().min(1).default("database.db"),
    }),
  }),

  player: z
    .object({
      elo: z.number().positive().default(1000),
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
