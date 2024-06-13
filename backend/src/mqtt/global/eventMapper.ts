export interface EventMapper<EvenType> {
  map: (event: EvenType, topic: string, payload: any) => Set<EvenType>;
}
