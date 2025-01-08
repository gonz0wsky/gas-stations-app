export type FilterOption = 'price' | 'near' | 'favorites';

const FILTER_OPTIONS: {id: FilterOption; label: string}[] = [
  {id: 'price', label: 'Precio'},
  {id: 'near', label: 'Cercanos'},
  {id: 'favorites', label: 'Favoritos'},
];

export default FILTER_OPTIONS;
