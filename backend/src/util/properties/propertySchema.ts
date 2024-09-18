import { z } from 'zod';

export type Properties = z.infer<typeof propertySchema>

export const propertySchema = z.object({
  digkick: z
    .object({
      banner: z.boolean().default(true)
    }),

  mqtt: z.object({
    login: z.object({
      username: z.string().min(1),
      password: z.string().min(1)
    }),
    host: z.string().min(1).default('localhost'),
    port: z.number().default(1883),
    protocol: z.union([z.literal('mqtt'), z.literal('mqtts')]).default('mqtt')
  }),

  db: z.object({
    source: z.object({
      database: z.string().min(1).default('database.db')
    })
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
                      message: 'Min player name length must be greater than 0!'
                    })
                    .default(3),
                  max: z
                    .number()
                    .positive({
                      message: 'Max player name length must be greater than 0!'
                    })
                    .default(12)
                })
            })
        })
    })
});

export function getDefaults<Schema extends z.AnyZodObject>(schema: Schema): any {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodObject) {
        return [key, getDefaults(value)];
      }
      if (value instanceof z.ZodDefault) {
        return [key, value._def.defaultValue()];
      }
      return [key, undefined];
    })
  );
}
