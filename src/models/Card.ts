type Card = {
  id: number;
  title: string;
  description: string;
  stars: number;
  addedOn: string;
  rare: boolean;
  image: string;
  postedBy: string;
  latitude: number;
  longitude: number;
  error?: boolean;
};

export default Card;
