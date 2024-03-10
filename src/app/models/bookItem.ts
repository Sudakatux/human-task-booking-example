
export interface SearchParams {
  destination: string;
  available: {
    from: string;
    to: string;
  };
}

export interface BookItem extends SearchParams {
  id: string;
  image: string;
  title: string;
  description: string;
}
