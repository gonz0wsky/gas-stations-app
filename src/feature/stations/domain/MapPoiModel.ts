export type MapPoi = {
  id: string;
  name: string;
  location: {latitude: number; longitude: number};
  isFavorite: boolean;
  priceLevel: 'low' | 'medium' | 'high';
};

export const PriceLevelValue = (
  price: number,
  ranges: {lowEnd: number; midEnd: number},
): MapPoi['priceLevel'] => {
  if (price > ranges.midEnd) {
    return 'high';
  } else if (price > ranges.lowEnd) {
    return 'medium';
  }
  return 'low';
};
