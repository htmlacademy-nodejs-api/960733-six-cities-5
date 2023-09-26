import {User} from './user.type.js';
import {Coordinate} from './coordinate.type.js';
import {Option} from './option.enum.js';
import {CityList} from './city.enum.js';
import {HousingType} from './housing-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: CityList;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  guests: number;
  price: number;
  options: Option[];
  user: User;
  location: Coordinate;
}
