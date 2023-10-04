import { Offer, UserType, CityList, Option, HousingType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    date,
    cityName,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    housingType,
    rooms,
    guests,
    price,
    options,
    name,
    email,
    avatar,
    password,
    userType,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title: title,
    description: description,
    date: new Date(date),
    city: CityList[cityName as keyof typeof CityList],
    previewImage: previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseInt(rating, 10),
    type: HousingType[housingType as keyof typeof HousingType],
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    options: options.split(';').map((option) => Option[option as keyof typeof Option]),
    user: {
      name: name,
      email: email,
      avatarPath: avatar,
      password: password,
      userType: UserType[userType as keyof typeof UserType]
    },
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    }
  } as Offer;
}
