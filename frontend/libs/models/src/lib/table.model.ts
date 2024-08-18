import { z } from 'zod';

export const TablesResponseSchema = z.object({
  names: z.array(z.string()),
});

export type TablesResponse = z.infer<typeof TablesResponseSchema>;

export const TableSchema = z.object({
  id: z.string(),
});

export type Table = z.infer<typeof TableSchema>;
