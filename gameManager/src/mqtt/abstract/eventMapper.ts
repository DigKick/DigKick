export interface EventMapper<EvenType> {
  map: (event: EvenType) => Set<EvenType>;
}
