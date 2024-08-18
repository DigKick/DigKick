import { z } from 'zod';
import { InjectionToken } from '@angular/core';

export const EnvironmentParser = z.object({
  debug: z.boolean().default(false),
  broker: z.object({
    hostname: z.string(),
    port: z.number(),
    path: z.string(),
    clientId: z.string(),
    protocol: z.union([z.literal('ws'), z.literal('wss')]),
  }),
});

export type Environment = z.infer<typeof EnvironmentParser>;

export const ENVIRONMENT = new InjectionToken<Environment>('environment');
